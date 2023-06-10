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
            message: 'OpenAI API key not configured'
        }
    }

    const animal = input || ''
    if (animal.trim().length === 0) {
        return {
            code: 500,
            message: '请输入关键词'
        }
    }

    try {
        // https://platform.openai.com/docs/guides/images
        const completion = await openai.createImage({
            n: 1,
            prompt: input,
            size: '256x256'
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

export const answer = (input: string) => {
    return generate(input)
}
