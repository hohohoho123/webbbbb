import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { MdCallEnd } from "react-icons/md";
import { BsFillCameraVideoOffFill } from "react-icons/bs";
import { IoMdMicOff } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { Peer } from "peerjs";
import { io } from "socket.io-client";
import { setUncaughtExceptionCaptureCallback } from "process";
import axios from "../axios";



function VideoCall() {
  const peer = new Peer()
    const [peerId, setPeerId] = useState('');
    const [callingStatus, SetCallingStatus] = useState('calling')
    let { callusername } = useParams(); 


    useEffect(()=>{
        peer.on('open', (id) => {
            // console.log(id)
            setPeerId(id)
        })
    },[])

    // console.log(peerId);
    
    
    useEffect(() => {
        if(peerId !== ''){
            startcall()

        }
    }, [peerId])

    const startcall = () => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`,
            
          
          }
        };
        
        let sender = JSON.parse(localStorage.getItem('user')||'').username
        let data = {
            receiver: callusername,
            sender: sender,
            peer_id: peerId
        }
        // console.log(callusername)
        // console.log(data)

        axios.post('  https://web-project-wzlk.onrender.com/chat-app/start-call/', data, config).then(response => {
        // console.log(response)
        }).catch(error => {
        // console.log(error.response)
        })
    }

    const initializeWebSocket = (peer_id) => {
        const socket = new WebSocket(`wss://192.168.137.233:8000/ws/message/${peer_id}`)
        socket.onmessage = (event) => {
            let message = JSON.parse(event.data);
            switch (message.status) {
              case 'end_call':
                endCall()
                break
            }
            // console.log(message)
    }

    const endCall = () => {
        SetCallingStatus('rejected')
        setTimeout(() => {
          window.close()
        }, 2000)
      }

  return (
    <Container>
      <div className="videocall-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src="https://avatars.dicebear.com/api/micah/:242.svg"
              alt="avatar"
            />
          </div>
          <div className="username">
            <h3> Bao Minh </h3>
          </div>
        </div>
      </div>
      <div className="videocall-content">
        <video className="myVideo"></video>
         <h3>End call</h3>
        <video className="currentVideoCall"></video>
      </div>
       
        <div className="videocall-action">
          <div className="endCall" onClick={()=>{}}>
            <MdCallEnd />
          </div>
        </div>

    </Container>
  );
}
}
const Container = styled.div`
  background-color: #0a0a0a;
  display: grid;
  grid-template-rows: 8% 81% 11%;
  height: 100vh;
  width: 100vw;
  overflow: auto;
  .videocall-content {
    h3 {
      color: white;
      position: absolute;
      top: 50%;
      right: calc(50% - 35px);
      font-size: 35px;
    }
    .myVideo {
      width: 20vw;
      height: 20vh;
      border: 1px solid white;
      display: block;
      position: fixed;
      top: 3px;
      right: 3px;
    }
    .currentVideoCall {
      width: 100%;
      height: 100%;
    }
  }
  .videocall-header {
    background-color: #f1f5f9;
    display: flex;
    align-items: center;
    padding: 5px 1rem;
    .user-details {
      display: flex;
      align-items: center;
      height: 70%;
      gap: 1rem;
      .avatar {
        img {
          border: 2px solid #4e0eff;
          border-radius: 50px;
          padding: 3px;
          height: 2.5rem;
          background-color: #f3f3f35c;
        }
      }
      .username {
        min-width: 85px;
        h3 {
          color: black !important;
        }
      }
    }
  }
  .videocall-action {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    .endCall {
      height: 3.5rem;
      width: 3.5rem;
      border-radius: 50px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #ce0c0c;
      transition: 0.2s ease-in;
      &:hover {
        transition: 0.2s ease-in;
        opacity: 0.8;
      }
      svg {
        font-size: 30px;
        color: white;
      }
    }
    .offCam {
      background-color: #9186f3;
      height: 2.5rem;
      width: 2.5rem;
      border-radius: 50px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.2s ease-in;
      svg {
        font-size: 20px;
        color: white;
      }
      &:hover {
        transition: 0.2s ease-in;
        opacity: 0.8;
      }
    }
    .offMic {
      background-color: #9186f3;
      height: 2.5rem;
      width: 2.5rem;
      border-radius: 50px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.2s ease-in;
      svg {
        font-size: 20px;
        color: white;
      }
      &:hover {
        transition: 0.2s ease-in;
        opacity: 0.8;
      }
    }
  }
`;
export default VideoCall;
