import { ClientSecretCredential } from "@azure/identity";

/* =========================================================
   HTML ESCAPE
   Prevents user-entered text from being interpreted as HTML
========================================================= */

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

/* =========================================================
   SEND EMAIL THROUGH MICROSOFT GRAPH
========================================================= */

const sendGraphEmail = async ({
  credential,
  fromEmail,
  toEmail,
  subject,
  htmlBody,
  replyToEmail,
  replyToName,
}) => {
  const tokenResponse = await credential.getToken(
    "https://graph.microsoft.com/.default"
  );

  if (!tokenResponse?.token) {
    throw new Error(
      "Could not obtain Microsoft Graph access token."
    );
  }

  const message = {
    subject,

    body: {
      contentType: "HTML",
      content: htmlBody,
    },

    toRecipients: [
      {
        emailAddress: {
          address: toEmail,
        },
      },
    ],
  };

  /* -------------------------------------------------------
     Add Reply-To only when provided
  ------------------------------------------------------- */

  if (replyToEmail) {
    message.replyTo = [
      {
        emailAddress: {
          address: replyToEmail,
          name: replyToName || "",
        },
      },
    ];
  }

  const response = await fetch(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(
      fromEmail
    )}/sendMail`,
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${tokenResponse.token}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        message,
        saveToSentItems: true,
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();

    console.error(
      "Microsoft Graph error:",
      errorText
    );

    throw new Error(
      "Microsoft Graph failed to send the email."
    );
  }

  return true;
};

/* =========================================================
   SEND CONTACT ENQUIRY
========================================================= */

export const sendContactEnquiry = async (req, res) => {
  try {
    /* -------------------------------------------------------
       1. Get form data
    ------------------------------------------------------- */

    const {
      name,
      company,
      email,
      phone,
      subject,
      message,
    } = req.body;

    /* -------------------------------------------------------
       2. Validate required fields
    ------------------------------------------------------- */

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email and message are required.",
      });
    }

    /* -------------------------------------------------------
       3. Check Microsoft environment variables
    ------------------------------------------------------- */

    const requiredEnvVariables = [
      "MICROSOFT_TENANT_ID",
      "MICROSOFT_CLIENT_ID",
      "MICROSOFT_CLIENT_SECRET",
      "OUTLOOK_SENDER_EMAIL",
      "CONTACT_RECEIVER_EMAIL",
    ];

    const missingVariables =
      requiredEnvVariables.filter(
        (variable) => !process.env[variable]
      );

    if (missingVariables.length > 0) {
      console.error(
        "Missing environment variables:",
        missingVariables
      );

      return res.status(500).json({
        success: false,
        message:
          "Email configuration is incomplete on the server.",
      });
    }

    /* -------------------------------------------------------
       4. Create Microsoft credential
    ------------------------------------------------------- */

    const credential = new ClientSecretCredential(
      process.env.MICROSOFT_TENANT_ID,
      process.env.MICROSOFT_CLIENT_ID,
      process.env.MICROSOFT_CLIENT_SECRET
    );

    /* -------------------------------------------------------
       5. Prepare common values
    ------------------------------------------------------- */

    const senderEmail =
      process.env.OUTLOOK_SENDER_EMAIL;

    const receiverEmail =
      process.env.CONTACT_RECEIVER_EMAIL;

    const emailSubject =
      subject?.trim() ||
      `New Website Enquiry from ${name}`;

    /* =======================================================
       EMAIL #1
       Send enquiry to KAEES
    ======================================================= */

    const adminEmailBody = `
      <div
        style="
          font-family: Arial, Helvetica, sans-serif;
          line-height: 1.6;
          color: #263445;
          max-width: 700px;
          margin: 0 auto;
        "
      >

        <div
          style="
            background: #263445;
            padding: 22px 24px;
            border-radius: 10px 10px 0 0;
          "
        >
          <h2
            style="
              color: #ffffff;
              margin: 0;
            "
          >
            New Contact Enquiry
          </h2>

          <p
            style="
              color: #dbe4ec;
              margin: 6px 0 0;
            "
          >
            KA Electrical Website
          </p>
        </div>

        <div
          style="
            border: 1px solid #e5e7eb;
            border-top: none;
            padding: 24px;
            border-radius: 0 0 10px 10px;
          "
        >

          <p style="color: #555;">
            A new enquiry has been submitted
            through the KA Electrical website.
          </p>

          <hr
            style="
              border: none;
              border-top: 1px solid #e5e7eb;
              margin: 24px 0;
            "
          />

          <h3 style="color: #263445;">
            Customer Details
          </h3>

          <p>
            <strong>Name:</strong>
            ${escapeHtml(name)}
          </p>

          <p>
            <strong>Company:</strong>
            ${escapeHtml(
              company || "Not provided"
            )}
          </p>

          <p>
            <strong>Email:</strong>
            ${escapeHtml(email)}
          </p>

          <p>
            <strong>Phone:</strong>
            ${escapeHtml(
              phone || "Not provided"
            )}
          </p>

          <p>
            <strong>Subject:</strong>
            ${escapeHtml(emailSubject)}
          </p>

          <h3
            style="
              color: #263445;
              margin-top: 28px;
            "
          >
            Message
          </h3>

          <div
            style="
              background: #f5f8f7;
              border-left: 4px solid #43bd62;
              padding: 16px;
              border-radius: 8px;
              white-space: pre-wrap;
            "
          >
            ${escapeHtml(message)}
          </div>

          <hr
            style="
              border: none;
              border-top: 1px solid #e5e7eb;
              margin: 24px 0;
            "
          />

          <p
            style="
              font-size: 12px;
              color: #777;
              margin: 0;
            "
          >
            This enquiry was submitted through
            the KA Electrical website.
          </p>

        </div>
      </div>
    `;

    /* -------------------------------------------------------
       Send admin email
    ------------------------------------------------------- */

    await sendGraphEmail({
      credential,
      fromEmail: senderEmail,
      toEmail: receiverEmail,
      subject: emailSubject,
      htmlBody: adminEmailBody,

      /* Reply to customer when KAEES clicks Reply */
      replyToEmail: email,
      replyToName: name,
    });

    /* =======================================================
       EMAIL #2
       Send confirmation to customer
    ======================================================= */

    const customerEmailBody = `
      <div
        style="
          font-family: Arial, Helvetica, sans-serif;
          line-height: 1.6;
          color: #263445;
          max-width: 700px;
          margin: 0 auto;
        "
      >

        <div
          style="
            background: #263445;
            padding: 22px 24px;
            border-radius: 10px 10px 0 0;
          "
        >
          <h2
            style="
              color: #ffffff;
              margin: 0;
            "
          >
            Thank You for Contacting KA Electrical
          </h2>

          <p
            style="
              color: #dbe4ec;
              margin: 6px 0 0;
            "
          >
            Your enquiry has been received
          </p>
        </div>

        <div
          style="
            border: 1px solid #e5e7eb;
            border-top: none;
            padding: 24px;
            border-radius: 0 0 10px 10px;
          "
        >

          <p>
            Hi
            <strong>${escapeHtml(name)}</strong>,
          </p>

          <p>
            Thank you for contacting
            <strong>
              KA Electrical Supply & Hardware
              Materials Trading
            </strong>.
          </p>

          <p>
            We have successfully received your
            enquiry. Our team will review your
            message and get back to you shortly.
          </p>

          <h3
            style="
              color: #263445;
              margin-top: 28px;
            "
          >
            Your Enquiry
          </h3>

          <div
            style="
              background: #f5f8f7;
              padding: 16px;
              border-radius: 8px;
            "
          >

            <p>
              <strong>Subject:</strong>
              ${escapeHtml(emailSubject)}
            </p>

            <p>
              <strong>Message:</strong>
            </p>

            <div
              style="
                white-space: pre-wrap;
              "
            >
              ${escapeHtml(message)}
            </div>

          </div>

          <p style="margin-top: 28px;">
            We appreciate your interest and
            look forward to assisting you.
          </p>

          <p style="margin-top: 28px;">
            Regards,<br />

            <strong>
              KA Electrical Supply & Hardware
              Materials Trading
            </strong>
            <br />

            <a
              href="mailto:${escapeHtml(
                senderEmail
              )}"
              style="
                color: #16a34a;
                text-decoration: none;
              "
            >
              ${escapeHtml(senderEmail)}
            </a>
          </p>

        </div>
      </div>
    `;

    /* -------------------------------------------------------
       Send customer confirmation
    ------------------------------------------------------- */

    await sendGraphEmail({
      credential,
      fromEmail: senderEmail,
      toEmail: email,
      subject:
        "Thank You for Contacting KA Electrical",
      htmlBody: customerEmailBody,
    });

    /* =======================================================
       SUCCESS
    ======================================================= */

    return res.status(200).json({
      success: true,
      message:
        "Your enquiry has been sent successfully.",
    });

  } catch (error) {
    /* -------------------------------------------------------
       Unexpected error
    ------------------------------------------------------- */

    console.error(
      "Contact enquiry error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while sending your enquiry.",
    });
  }
};