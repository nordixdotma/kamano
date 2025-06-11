"use server"

import nodemailer from "nodemailer"
import type { CartItem } from "@/lib/cart-context"

interface OrderFormData {
  fullName: string
  email: string
  phone: string
  city: string
  address: string
  items: CartItem[]
  totalPrice: number
}

export async function sendOrderEmail(orderData: OrderFormData) {
  try {
    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    // Recipient email (where the order notifications will be sent)
    const recipientEmail = process.env.RECIPIENT_EMAIL || "noureddineelmhassani@gmail.com"

    // Format items for email
    const itemsList = orderData.items
      .map(
        (item) =>
          `<tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.size || "N/A"}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.color || "N/A"}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.price}</td>
      </tr>`,
      )
      .join("")

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_FROM || "noureloko995@gmail.com",
      to: recipientEmail,
      replyTo: orderData.email || undefined,
      subject: `Nouvelle Commande de ${orderData.fullName}`,
      html: `
        <h2>Nouvelle Commande</h2>
        <h3>Informations Client:</h3>
        <p><strong>Nom:</strong> ${orderData.fullName}</p>
        <p><strong>Email:</strong> ${orderData.email || "Non fourni"}</p>
        <p><strong>Telephone:</strong> ${orderData.phone}</p>
        <p><strong>Ville:</strong> ${orderData.city}</p>
        <p><strong>Adresse:</strong> ${orderData.address.replace(/\n/g, "<br>")}</p>
        
        <h3>Details de la Commande:</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #f3f4f6;">
              <th style="padding: 8px; text-align: left; border-bottom: 2px solid #ddd;">Produit</th>
              <th style="padding: 8px; text-align: left; border-bottom: 2px solid #ddd;">Quantite</th>
              <th style="padding: 8px; text-align: left; border-bottom: 2px solid #ddd;">Taille</th>
              <th style="padding: 8px; text-align: left; border-bottom: 2px solid #ddd;">Couleur</th>
              <th style="padding: 8px; text-align: left; border-bottom: 2px solid #ddd;">Prix</th>
            </tr>
          </thead>
          <tbody>
            ${itemsList}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4" style="padding: 8px; text-align: right; font-weight: bold;">Total:</td>
              <td style="padding: 8px; font-weight: bold;">${orderData.totalPrice.toFixed(2)} MAD</td>
            </tr>
          </tfoot>
        </table>
      `,
      text: `
        Nouvelle Commande
        
        Informations Client:
        Nom: ${orderData.fullName}
        Email: ${orderData.email || "Non fourni"}
        Telephone: ${orderData.phone}
        Ville: ${orderData.city}
        Adresse: ${orderData.address}
        
        Details de la Commande:
        ${orderData.items
          .map(
            (item) =>
              `- ${item.name} (${item.quantity}x) - ${item.price}
         Taille: ${item.size || "N/A"}, Couleur: ${item.color || "N/A"}`,
          )
          .join("\n")}
        
        Total: ${orderData.totalPrice.toFixed(2)} MAD
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return { success: true, message: "Order notification sent successfully!" }
  } catch (error) {
    console.error("Error sending order email:", error)
    // Log more detailed error information
    if (error instanceof Error) {
      console.error("Error name:", error.name)
      console.error("Error message:", error.message)
      console.error("Error stack:", error.stack)
    }
    return { success: false, message: "Failed to send order notification." }
  }
}
