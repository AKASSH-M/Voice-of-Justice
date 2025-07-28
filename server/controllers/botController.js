const express = require('express');
const axios = require('axios');
const cors = require('cors');



exports.getResponse = async (req, res) => {
    const { userInput } = req.body;
    if (!userInput) {
        return res.status(400).json({ error: 'User input is required' });
    }

    console.log('Received user input:', userInput);
    console.log('Processing response...');
    
    const response = `You said: ${userInput}. This is a placeholder response. 
    this genrated by node ecpresss`;
    res.status(200).json({ reply : response });
};