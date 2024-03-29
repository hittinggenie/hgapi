import express from "express";
import Mailchimp from "@mailchimp/mailchimp_marketing";
import "dotenv/config";
import cors from "cors";
const router = express.Router();

router.use(cors());

Mailchimp.setConfig({
  apiKey: process.env.API_KEY,
  server: process.env.SERVER_PREFIX,
});

router.post("/subscribe", async (req, res) => {
  const { email, firstName, lastName } = req.body;
  try {
    const listId = process.env.AUDIENCE_ID;
    const response = await Mailchimp.lists.addListMember(listId, {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
      },
    });

    res.status(200).json({ success: true, response });
  } catch (error) {
    console.error("Error adding member to list:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
