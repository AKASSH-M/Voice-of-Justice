const express = require('express');
const axios = require('axios');
const cors = require('cors');

exports.getResponse = async (req, res) => {
    const { userInput } = req.body;

    if (!userInput) {
        return res.status(400).json({ error: 'User input is required' });
    }

    console.log('Received user input:', userInput);
    console.log('Calling OpenRouter API...');

    try {
        const openRouterResponse = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: "mistralai/mistral-7b-instruct:free",
                messages: [
                    {
                        role: "system",
                        content: "You are a legal assistant named Voice of Justice. You help users understand Indian laws and provide general legal advice in simple language. Avoid giving specific or binding legal decisions."
                    },
                    {
                        role: "user",
                        content: userInput
                    }
                ]
            },
            {
                headers: {
                    Authorization: 'Bearer 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',
                    'Content-Type': 'application/json'
                }
            }
        );

        const reply = openRouterResponse.data.choices[0].message.content;
        res.status(200).json({ reply });

    } catch (error) {
        console.error('Error calling OpenRouter API:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to fetch response from AI' });
    }
};
