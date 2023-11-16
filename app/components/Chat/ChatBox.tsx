"use client"
import { Avatar } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'

const ChatSystem = ({ message }) => {
    console.log('in chat ', message);

    return <div className="col-start-1 col-end-13 md:col-end-8 p-3 rounded-lg">
        <div className="flex flex-row items-center">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                <Avatar alt="Remy Sharp" src='/systemChatImage.jpg' />
            </div>
            <div className="text-black relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                <div>
                    {message}
                </div>
            </div>
        </div>
    </div>

}

const ChatUser = ({ message , name}) => {
    return <div className="col-start-6 col-end-13 p-3 rounded-lg">
        <div className="flex items-center justify-start flex-row-reverse ">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                <Avatar {...stringAvatar(name?.toUpperCase?.())} />
            </div>
            <div className="relative text-white mr-3 text-[14px] py-2 px-4 shadow rounded-xl bg-[#61b0e4]">
                <div>
                    {message}
                </div>
            </div>
        </div>
    </div>
}

const CHAT_STATUS = {
    NOT_THING: 'nothing',
    START: 'start',
    FINISH: 'finish',

}


function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts:any = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }


const ChatBox = ({ user }) => {
    const containerRef = useRef(null);
    const [prompt, updatePrompt] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [answer, setAnswer] = useState<string>("");
    const [chatList, setChatList] = useState([])
    const [textChat, setTextChat] = useState('')
    const [isShowSteamChat, setShowStreamChat] = useState(false)
    console.log("🚀 ~ file: ChatBox.tsx:51 ~ ChatBox ~ isShowSteamChat:", isShowSteamChat)
    const [chatStatus, setChatStatus] = useState(CHAT_STATUS.NOT_THING)

    useEffect(() => {
        if (containerRef && containerRef.current) {
            const element: any = containerRef.current;
            element.scroll({
                top: element.scrollHeight,
                left: 0,
                behavior: "smooth"
            })
        }

    }, [containerRef, chatList, answer])


    useEffect(() => {
        setTimeout(() => {
            setChatList((prev): any => [...prev, <ChatSystem message={'มีข้อสงสัยอะไรไหม ? ถามเราได้ตลอดเลยจ้า'} />])
        }, 1000)
    }, [])

    useEffect(() => {
        if (CHAT_STATUS.FINISH && answer) {
            setChatList((prev): any => [...prev, <ChatSystem message={answer} />])
            setShowStreamChat(false)
        }

    }, [chatStatus])

    useEffect(() => {
        if (prompt != null && prompt.trim() === "") {
            setAnswer("");
        }
    }, [prompt]);

    const sendPrompt = async (prompt) => {
        setShowStreamChat(true)
        try {
            setLoading(true);
            setChatStatus(CHAT_STATUS.START)
            setAnswer("");
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/chat`, {
                method: "post",
                credentials: 'include',
                headers: {
                    Accept: "application/json, text/plain, */*", // indicates which files we are able to understand
                    "Content-Type": "application/json", // indicates what the server actually sent
                    tokenx: getCookie('access_token')
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
                    // setChatList((prev):any => [...prev, <ChatSystem message={answer} />])
                    setShowStreamChat(false)
                    setChatStatus(CHAT_STATUS.FINISH)
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

    const handleClickSent = () => {
        if (!textChat) { return; }

        let newList: any = [...chatList]

        newList.push(<ChatUser message={textChat} name={user.name}/>)
        setChatList(newList)
        sendPrompt(textChat)
        setTextChat('')

    }

    return (
        <div>
            {/* <div className="app">
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
            </div> */}
            <div className="flex flex-col flex-auto p-0 md:p-6">
                <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100  p-4">
                    <div className="flex flex-col  overflow-x-auto mb-4 max-h-[200px]" ref={containerRef}>
                        <div className="flex flex-col ">
                            <div className="grid grid-cols-12 gap-y-2">
                                {/* <div>{answer}</div> */}
                                {
                                    chatList.map((ele, idx) => <>{ele}</>)
                                }
                                {
                                    (isShowSteamChat && answer) && <>
                                        <ChatSystem message={answer} />
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                        <div className="flex-grow ml-4">
                            <div className="relative w-full">
                                <input onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        handleClickSent()
                                    }
                                }}
                                    onChange={e => setTextChat(e.target.value)} value={textChat} type="text" className="text-black flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 h-10" />
                            </div>
                        </div>
                        <div className="ml-4">
                            <button onClick={handleClickSent} className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
                                <span>Send</span>
                                <span className="ml-2">
                                    <svg className="w-4 h-4 transform rotate-45 -mt-px" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name: string) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')?.[1]?.[0] || ''}`,
    };
}



export default ChatBox