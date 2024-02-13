import express from "express";
import Mailchimp from "mailchimp-api-v3";

const router = express.Router();
const api_key = process.env.API_KEY;
const client = new Mailchimp('bd21bc428e4124613bfc00f99478feaa-us21');

router.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  try {
    const listId = process.env.AUDIENCE_ID;
    const response = await client.request({
      method: "post",
      path: `/lists/${listId}/members`,
      body: {
        email_address: email,
        status: "subscribed",
      },
    });

    res.status(200).json({ success: true, response });
  } catch (error) {
    console.error("Error adding member to list:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
