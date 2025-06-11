# Email Setup Instructions

To enable the contact form email functionality, you need to set up your email credentials in the `.env.local` file.

## Steps:

1. Create a `.env.local` file in the root directory of your project
2. Add the following environment variables with your actual email credentials:

\`\`\`
# Email Configuration
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@example.com
EMAIL_PASSWORD=your-email-password
EMAIL_FROM=contact@tierrablanca.ma
RECIPIENT_EMAIL=Contact@sofiandco.ma
\`\`\`

## Email Provider Examples:

### Gmail
\`\`\`
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
\`\`\`

Note: For Gmail, you might need to use an "App Password" instead of your regular password if you have 2-factor authentication enabled.

### Outlook/Hotmail
\`\`\`
EMAIL_HOST=smtp.office365.com
EMAIL_PORT=587
EMAIL_SECURE=false
\`\`\`

### Yahoo
\`\`\`
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=587
EMAIL_SECURE=false
\`\`\`

## Important Notes:

- Keep your `.env.local` file secure and never commit it to version control
- In production, set these environment variables in your hosting provider's dashboard (e.g., Vercel)
- The `RECIPIENT_EMAIL` is where contact form submissions will be sent
- The `EMAIL_FROM` should be a valid email address that represents your website
