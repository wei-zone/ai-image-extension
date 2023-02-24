/**
 * @Author: forguo
 * @Date: 2023/2/19 16:58
 * @Description: chat.ts
 */

import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
    apiKey: process.env.VITE_OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

export const generate = async (input: string) => {
    if (!configuration.apiKey) {
        return {
            code: 500,
            message: 'OpenAI API key not configured, please follow instructions in README.md'
        }
    }

    const animal = input || ''
    if (animal.trim().length === 0) {
        return {
            code: 500,
            message: 'Please enter a valid animal'
        }
    }

    try {
        const completion = await openai.createImage({
            model: 'image-alpha-001',
            prompt: input
        })
        return { code: 200, data: completion.data.data }
    } catch (error: any) {
        // Consider adjusting the error handling logic for your use case
        if (error.response) {
            console.error(error.response.status, error.response.data)
            return {
                code: error.response.status,
                message: error.response.data,
                data: error.response.data
            }
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`)
            return {
                code: 500,
                message: 'An error occurred during your request.'
            }
        }
    }
}

function generatePrompt(input: string) {
    return `Suggest three names for an animal that is a superhero.

Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: ${input}
Names:`
}

export const answer = (input: string) => {
    return generate(input)
}
