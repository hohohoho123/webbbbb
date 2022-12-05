import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
// import { io } from 'socket.io-client';
import { Avatar, Dropdown, Spinner } from 'flowbite-react';
import { IoIosArrowBack, IoIosCall, IoMdSend } from 'react-icons/io';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { BsEmojiHeartEyesFill } from 'react-icons/bs';
import userContext from '../utils/userContext';
import { getAllUsers, sendMessage } from '../api';
import emojiArr from './emoji';
import { chatSocket } from "../ws/ws";
// import { log } from 'console';
import axios from 'axios';
// import { resourceLimits } from 'worker_threads';
// import { relative } from 'path';
// import { response } from 'express';
// import { useRef } from 'react';
// import { parse } from 'node:path/posix';

// import { w3cwebsocket as W3CWebSocket } from 'websocket';
interface Props {
  inboxToggle: boolean;
  setInboxToggle: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  
}

const Inbox: React.FC<Props> = ({ inboxToggle, setInboxToggle, username }) => {
  const {
    data: allUsers,
    isLoading: isPreviewLoading,
    refetch: refetchAllUsers,
  } = useQuery({
    queryFn: () => getAllUsers(),
    // queryKey: ["allUsersData"],
    // enabled: !!isSuccess,
  });

  const [socket, setSocket] = useState<any>(null);

  // const [data, setData] = useState<any>(undefined)

  // const { user } = useContext<any>(userContext);

  // const [me, setMe] = useState<boolean>(false)

  const [realTimeMessage, setRealTimeMessage] = useState<{ self: boolean; message: string; date_time: string }[]>([]);

  const [hideEmoji, setHideEmoji] = useState<boolean>(true);

  const [message, setMessage] = useState<string>('');

  const [receiverProfile, setReceiverProfile] = useState<any>(undefined)

  const myRef = React.useRef<HTMLDivElement>(null);

  // const [scrollTop, setScrollTop] = useState(undefined)


  // const chatSocket = () => chatSocketVar()

  // useEffect(() => {
  //   socket && socket.emit('add', user._id);
  // }, [socket, user]);

  // useEffect(() => {
  //   socket &&
  //     socket.on('receive-message', (text: string) => {
  //       console.log(text);
  //       setRealTimeMessage((message: any) => [{ self: false, message: text }, ...message]);
  //     });
  //   // eslint-disable-next-line
  // }, [socket]);
  // useEffect(()=> {
  //   console.log(`rerender: ${username}`)
  // }
  // ,[username])

  // changeConversation()
  // setRealTimeMessage([])



  const onChange = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLButtonElement;
    setMessage(value);
    
  };

  const { isFetching: isMessageFetching } = useQuery({
    queryFn: () => getAllUsers(),
    queryKey: ['getMessage', username],
    enabled: !!username,
    onSuccess: (data) => {
      // setSocket(io('/'));
      // setRealTimeMessage(data);
      // console.log(data)
      setRealTimeMessage([])

      const conversation = data.find(function (el: any) {
        return el.username === username 
      })
      // console.log(conversation.photo)
      setReceiverProfile(conversation)
      

      conversation.messages.map((element: any, index: any, array: any) => {
        // console.log(`${element.sender}: ${element.text}`)
        // alert(1)

        
        
        if (element.sender === username) {
          setRealTimeMessage((prev) => [{ self: false, message: element.text, date_time: element.date_time }, ...prev]);
        } else {
          setRealTimeMessage((prev) => [{ self: true, message: element.text, date_time: element.date_time }, ...prev]);
        }
        // return {
        //   self: me,
        //   message: element.text
        // }
      })

      // for (let i = conversation.messages.length - 101; i < conversation.messages.length; i++) {
      //   if (conversation.messages[i].sender === username){
      //     setRealTimeMessage((prev) => [{ self: false, message: conversation.messages[i].text, date_time: conversation.messages[i].date_time }, ...prev]);
      //   } else {
      //     setRealTimeMessage((prev) => [{ self: true, message: conversation.messages[i].text, date_time: conversation.messages[i].date_time }, ...prev]);
      //   }
      // }

    },
  });

  chatSocket.onmessage = function(e) {
    // console.log(e.data);
    const status = JSON.parse(e.data).status
    
    if (status === "new_call") {
      // console.log(status)
      window.open(`https://webbbbbbbb.vercel.app/answercall/${JSON.parse(e.data).message.data.sender}`)
    }
    const data = JSON.parse(e.data).text
    // setSocket(io('/'));
    const sender = data.split(":")
    const message = sender[1]
    
    
    if (username === sender[0]){
      const date = new Date()
      const date_time = date.toISOString()
      setRealTimeMessage((prev) => [{ self: false, message, date_time}, ...prev]);
    }
  }
  
  // alert(typeof realTimeMessage)

  // alert(isMessageFetching)

  // const receiver = async (username: string) => {
  //   const token = localStorage.getItem('token')

  //   const config = {
  //     headers: { Authorization: `Bearer ${token}` }
  //   };

  //   // const bodyParameters = {
  //   //   key: "value"
  //   // };
  //   const res = await axios.get(`  https://web-project-wzlk.onrender.com/chat-app/users/`, config);

  //   const result = res.data.filter(function (el: any) {
  //     return el.username === username 
  //   })
  //   setRealTimeMessage(result)
  //   return result[0].photo;
  // }

  // const run = receiver(username)

  const handleSendMessage = useMutation(
    (data: { receiver: string; text: string }) => sendMessage(data),
    {
      onSuccess: () => {
        socket &&
          socket.emit('send-message', {
            receiver: username,
            text: message,
          });
        // setRealTimeMessage((prev) => [{ self: true, message }, ...prev]);
        setMessage('');
        // console.log(realTimeMessage)
      },
      
    }
  );


  

  
  
  
  
  

  // chatSocket.onopen = event => console.log("Connected")
  // chatSocket.onclose = event => console.log("Disconnected")
  // chatSocket.onmessage = function(e){ 
  //   console.log(e.data) 
  // }
  // chatSocket.onerror = event => console.log(`Error: `)

  // const handleSubmitWs = (message: string) => {
  //   chatSocket.onopen = () => {
  //     console.log('connect');
      
  //     chatSocket.send(JSON.stringify({
  //       'message': message,
  //       'receiver':username
  //     }))
  //   }
  // }

  // alert(username)
  
  // console.log(realTimeMessage.length ? true : false)
  
  const handleDate = (date: string) => {
    return new Date(date)
  }

  return (
    <div
      className={`${
        inboxToggle ? 'flex' : 'hidden'
      } h-full md:col-span-4 col-span-full md:flex flex-col justify-between drop-shadow-lg rounded-lg shadow-lg shadow-slate-400`}
    >
      <div className='w-full basis-20 flex justify-between items-center rounded-tl-lg px-6 shadow-lg'>
        <IoIosArrowBack
          size={25}
          className='text-slate-700 cursor-pointer'
          onClick={(): void => setInboxToggle(false)}
        />
        <div className='basis-3/4'>
          <Avatar
            img={
              receiverProfile && receiverProfile.photo
            }
            rounded={true}
            status='online'
            statusPosition='bottom-right'
            
          >
            <div className='space-y-1 font-medium'>
              <div className='truncate'>{receiverProfile && receiverProfile.fullname}</div>
              <div className='text-sm text-gray-500 truncate'>{username}</div>
            </div>
          </Avatar>
        </div>
        <Link target={"_blank"} to={`/videocall/${username}`}>    
          <IoIosCall 
            size={25} 
            className='text-slate-700 mx-3' 
            onClick={() =>
              console.log('call start')
              
            }
            style={{cursor: "pointer"}}
          />
        </Link>
        <div className='flex items-center justify-center'>
          <BiDotsVerticalRounded
            size={25}
            className='text-slate-700 absolute -z-10 pointer-events-none'
          />
          <div className='dropdown dropdown-end text-white'>
            <label
              tabIndex={0}
              className='btn bg-transparent outline-none border-0 hover:bg-transparent'
            ></label>
            <ul tabIndex={0} className='dropdown-content menu p-2 shadow rounded-box w-52 bg-white'>
              <Dropdown.Item>Delete Conversation</Dropdown.Item>
            </ul>
          </div>
        </div>
      </div>

      
      <div 
        className='w-full basis-3/4 flex flex-col-reverse px-6 overflow-scroll overflow-x-hidden'
        onScroll={(e) => {
          // const scrollY = window.scrollY //Don't get confused by what's scrolling - It's not the window
          // const scrollTop = myRef.current?.scrollTop
          // // const offsetTop = myRef.current?
          
          
        }}
        ref = {myRef}
      >
        
        {isMessageFetching ? (
          <Spinner color='pink' aria-label='Pink spinner example' size={'xl'} />
        ) : (
          realTimeMessage.length ? (
            realTimeMessage &&
            realTimeMessage.map((element: any, index: number) => (
              <div className='w-full flex flex-col' key={index} id={index === 0 ? 'position' : ''}  >
                <div className={`items-end mt-3 ${!element.self ? 'flex' : 'hidden'}`}>
                  <div className='mr-2'>
                    <Avatar
                      img={
                        receiverProfile && receiverProfile.photo
                      }
                      rounded={true}
                      size='xs'
                    ></Avatar>
                  </div>
                  <div className='min-h-fit md:max-w-[45%] max-w-[65%] border bg-slate-50 py-[14px] px-[18px] rounded-3xl rounded-bl-none md:text-sm text-xs break-words'>
                    {element.message}
                  </div>
                  
                  
                </div>
                <div
                  className={`${
                    element.self ? 'block' : 'hidden'
                  } min-h-fit md:max-w-[45%] max-w-[65%] mt-3 bg-[#1a2238] text-white py-[14px] px-[18px] rounded-3xl rounded-br-none md:text-sm text-xs self-end break-words block`}
                >
                  {element.message}
                </div>
                <span
                  
                  style={{
                    display: 'flex' ,
                    flexDirection: element.self ? 'row-reverse' : 'row',
                    opacity: '0.8',
                    fontSize: '13px',
                    marginLeft: element.self ? '' : '33px',
                  }}
                >
                  {`${handleDate(element.date_time).toLocaleTimeString()}`}
                </span>
              </div>
            ))
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              // backgroundImage: 'url("https://cdn.dribbble.com/users/2333097/screenshots/8574268/media/c024e71216d2ce5d8dd97c81781d573b.gif")',
              backgroundImage: 'url("/image/inbox.gif")',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              filter: 'blur(1px)'
            }}>
            </div>
          )
        )}
      </div>


      <div className='w-full basis-24 flex items-center justify-center px-6'>
        <form
          className='w-full h-12 flex items-center justify-between px-4 rounded-full border border-slate-400'
          onSubmit={(event: React.SyntheticEvent) => {
            if (message) {
              event.preventDefault();
                // handleSendMessage.mutate({
                //   receiver: username,
                //   text: message,
                // });
                const send = `${JSON.parse(localStorage.getItem("user")|| "").username }: ${message}`
                const data = JSON.stringify({
                  'message': send,
                  'receiver': username
                })
                const datalog = JSON.stringify({
                  'text': message,
                  'receiver': username
                })
                // console.log(data)
                chatSocket.send(data)
                const token = localStorage.getItem('token')

                const config = {
                  headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    
                  }
                };
                axios.post(`  https://web-project-wzlk.onrender.com/chat-app/message/`, datalog, config)
                  .then((response) => {
                    // console.log('doroi')
                  })
                // const send = () => sendMessageWs(username, message)
                const date = new Date()
                const date_time = date.toISOString()
                setRealTimeMessage((prev) => [{ self: true, message, date_time}, ...prev]);
                setMessage('');
            }
          }}
        >
          <div
            className={`absolute max-h-72 overflow-scroll overflow-x-hidden bottom-20 ${
              hideEmoji ? 'hidden' : 'grid'
            } grid-rows-auto grid-cols-6 p-1 rounded-2xl rounded-bl-none bg-slate-50 list-none`}
          >
            {emojiArr.map((element, index) => (
              <li
                className='text-3xl cursor-pointer'
                key={index}
                onClick={(): void => setMessage(message.concat(element))}
              >
                {element}
              </li>
            ))}
          </div>

          <BsEmojiHeartEyesFill
            size={28}
            className='text-slate-500 cursor-pointer'
            onClick={(): void => setHideEmoji(!hideEmoji)}
          />

          <input
            placeholder='Message'
            value={message}
            className='w-full h-full border-0 bg-inherit focus:border-0 focus:outline-none px-5'
            onChange={onChange}
          />

          <IoMdSend
            size={28}
            className={`${
              handleSendMessage.isLoading && 'pointer-events-none'
            } cursor-pointer text-[#1a2238]`}
            onClick={(event: React.SyntheticEvent) => {
              if (message) {
                event.preventDefault();
                // handleSendMessage.mutate({
                //   receiver: username,
                //   text: message,
                // });
                const send = `${JSON.parse(localStorage.getItem("user")|| "").username }: ${message}`
                const data = JSON.stringify({
                  'message': send,
                  'receiver': username
                })
                const datalog = JSON.stringify({
                  'text': message,
                  'receiver': username
                })
                // console.log(data)
                chatSocket.send(data)
                const token = localStorage.getItem('token')

                const config = {
                  headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',                  
                  }
                };
                axios.post(`  https://web-project-wzlk.onrender.com/chat-app/message/`, datalog, config)
                  .then((response) => {
                    // console.log('doroi')
                  })

                const date = new Date();
                const date_time = date.toISOString();
                // const send = () => sendMessageWs(username, message)
                
                setRealTimeMessage((prev) => [{ self: true, message, date_time }, ...prev]);
                setMessage('');
              }
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default Inbox;