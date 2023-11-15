"use client"
import { useChat, Message } from "ai/react"
import { useEffect, useState } from "react";

export default function ChatComponent() {
    // Vercel AI SDK (ai package) useChat()


    const [prompt, updatePrompt] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [answer, setAnswer] = useState<string>("");

    useEffect(() => {
        if (prompt != null && prompt.trim() === "") {
            setAnswer("");
        }
    }, [prompt]);

    const sendPrompt = async (event: React.KeyboardEvent) => {
        if (event.key !== "Enter") {
            return;
        }

        try {
            setLoading(true);
            setAnswer("");
            const response = await fetch(`${process.env.NEXT_PUBLIC_SOCKET_SERVER_URI}/chatGpt`, {
                method: "post",
                headers: {
                    Accept: "application/json, text/plain, */*", // indicates which files we are able to understand
                    "Content-Type": "application/json", // indicates what the server actually sent
                },
                body: JSON.stringify({ message: prompt }), // server is expecting JSON
            });
            if (!response.ok || !response.body) {
                throw response.statusText;
            }
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            const loopRunner = true;

            while (loopRunner) {
                const { value, done } = await reader.read();
                if (done) {
                    break;
                }
                const decodedChunk = decoder.decode(value, { stream: true });
                setAnswer((answer) => answer + decodedChunk);
            }
        } catch (err) {
            console.error(err, "err");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div>
            <div className="app">
                <div className="app-container">
                    <div className="spotlight__wrapper">
                        <input
                            type="text"
                            className="spotlight__input"
                            placeholder="Ask me anything..."
                            disabled={loading}                           
                            onChange={(e) => updatePrompt(e.target.value)}
                            onKeyDown={(e) => sendPrompt(e)}
                        />
                        <div className="spotlight__answer">{answer && <p>{answer}</p>}</div>
                    </div>
                </div>
            </div>
           
        </div>
    )
}


// {messages.map((message: Message) => {
//     return (
//         <div key={message.id}>
//             {/*  Name of person talking */}
//             {
//                 message.role === "assistant"
//                     ?
//                     <h3 className="text-lg font-semibold mt-2">
//                         GPT-3
//                     </h3>
//                     :
//                     <h3 className="text-lg font-semibold mt-2">
//                         User
//                     </h3>
//             }

//             {/* Formatting the message */}
//             {message.content.split("\n").map((currentTextBlock: string, index: number) => {
//                 if (currentTextBlock === "") {
//                     return <p key={message.id + index}>&nbsp;</p> // " "
//                 } else {
//                     return <p key={message.id + index}>{currentTextBlock}</p> // "Cooper Codes is a YouTuber"
//                 }
//             })}


//             {/*  
//                 Cooper Codes is a YouTuber

//                 He makes software content

//                 You should subscribe.

//                 ["Cooper Codes is a YouTuber", "", "He makes software content", "", "You should subscribe."]

//             */}
//         </div>
//     )
// })}

// <form className="mt-12" onSubmit={handleSubmit}>
//     <p>User Message</p>
//     <textarea
//         className="mt-2 w-full bg-slate-600 p-2"
//         placeholder={"What are data structures and algorithims?"}
//         value={input}
//         onChange={handleInputChange}
//     />
//     <button className="rounded-md bg-blue-600 p-2 mt-2">
//         Send message
//     </button>
// </form>