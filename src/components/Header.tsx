// import { Alert } from "flowbite-react";
import React, { useContext, useRef, useState, useEffect } from "react";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { Types } from "mongoose";
// import { HiInformationCircle } from "react-icons/hi";
import userContext from "../utils/userContext";
// import SearchIcon from "@material-ui/icons/Search";
// import { Modal } from "flowbite-react";
// import { makeStyles } from "@material-ui/core/styles";
// import { Input } from "@material-ui/core";
// import HomeIcon from '@material-ui/icons/Home';
// import NearMeOutlinedIcon from '@material-ui/icons/NearMeOutlined';
// import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
// import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
// // import MapsUgcOutlinedIcon from '@material-ui/icons-material/MapsUgcOutlined';
// import { Avatar, Dropdown } from "flowbite-react";
// import { getAllUsers, setAvatar, deleteUser } from "../api";
import { useNavigate } from "react-router-dom";



// import "./Header.css"
import axios from "axios";


const Header: React.FC = () => {
  const navigate = useNavigate()
  // const { user } = useContext<any>(userContext);
  const [toggle, setToggle] = useState<boolean>(false);
  const [toggle1, setToggle1] = useState<boolean>(false);
  const [myself, setMyself] = useState<any>(null)


  const handleToggle = () => {
    setToggle(!toggle)
  }
  const handleToggle1 = () => {
    setToggle1(!toggle1)
  }

  useEffect(() => {
    setMyself(JSON.parse(localStorage.getItem('user') || ''))
    // console.log(myself)
  },[])


  
  
  
  // const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] =
  // useState<boolean>(false);

  // const [isAvatarModalOpen, setIsAvatarModalOpen] = useState<boolean>(false);

  // const [avatarImage, setAvatarImage] = useState<string[]>([]);

  // const [avatarSelectIndex, setAvatarSelectIndex] = useState<number>(NaN);

  // const searchRef = useRef() as any;

  // const [avtForm, setAvtForm] = useState<boolean>(false)

  // const {
  //   data: allUsers,
  //   isLoading: isPreviewLoading,
  //   refetch: refetchAllUsers,
  // } = useQuery({
  //   queryFn: () => getAllUsers(user && user._id),
  //   queryKey: ["allUsersData"],
  //   enabled: !!isSuccess,
  // });

  // const avt = JSON.parse(localStorage.getItem('user')||'').photo;

  // const { isLoading: isAvatarLoading } = useQuery({
  //   queryFn: async () => {
  //     const imageData = [];
  //     for (let i = 0; i < 6; i++) {
  //       const { data } = await axios.get(
  //         `https://api.multiavatar.com/4645646/${Math.round(
  //           Math.random() * 1000
  //         )}?apikey=nQluaHjWZ83G95`
  //       );
  //       const buffer = new Buffer(data);
  //       imageData.push(buffer.toString("base64"));
  //     }
  //     setAvatarImage(imageData);
  //   },
  //   queryKey: ["getAvatar"],
  //   refetchOnWindowFocus: false,
  // });

  // const handleSetAvatar = useMutation(
  //   ({ id, imgUrl }: { id: string | Types.ObjectId; imgUrl: string }) =>
  //     setAvatar({ id, imgUrl }),
  //   {
  //     onSuccess: (res) => {
  //       refetchAllUsers();
  //       refetch();
  //       setIsAvatarModalOpen(false);
  //       setIsAlert({
  //         ...isAlert,
  //         isOpen: true,
  //         title: res.message,
  //         type: "success",
  //       });
  //     },
  //     onError: (err: any) =>
  //       setIsAlert({
  //         ...isAlert,
  //         isOpen: true,
  //         title: err.response.data,
  //         type: "failure",
  //       }),
  //   }
  // );

  // const handleDeleteUser = useMutation((id: string) => deleteUser(id), {
  //   onSuccess: (res) => {
  //     userLogout();
  //     setIsDeleteUserModalOpen(false);
  //     setIsAlert({
  //       ...isAlert,
  //       isOpen: true,
  //       title: res.message,
  //       type: "success",
  //     });
  //   },
  //   onError: (err: any) =>
  //     setIsAlert({
  //       ...isAlert,
  //       isOpen: true,
  //       title: err.response.data,
  //       type: "failure",
  //     }),
  // });

  const handleUsers = () => {
    navigate('/users')
  }

  // return (
  //   <>
  //       <div className="app__header">
  //         <div className="img-logo">

  //           <img
  //             className="app__headerImage"
  //             // src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Google_Chat_logo_%282017-2020%29.svg/2560px-Google_Chat_logo_%282017-2020%29.svg.png"
  //             src = "/image/logo.svg.png"
  //             alt="instagram"
  //           />
  //         </div>

  //         <div className="searchForm">
  //           <form>
  //             <SearchIcon className="searchIcon opa" fontSize="medium" />
  //             <input type="text" id="filter" placeholder="Search" className="searchBarInput no-outline"/>
  //           </form>
  //         </div>

  //         <div className="container-icons">

  //           <div className="header_icons">
  //             <HomeIcon fontSize="large" className="header_icon" onClick={() => navigate("/")}/>
              
  //             <NearMeOutlinedIcon fontSize="large" className="header_icon"/>
  //             <ExploreOutlinedIcon fontSize="large" className="header_icon"/>
  //             <FavoriteBorderOutlinedIcon fontSize="large" className="header_icon" />

  //             <div className="avt">
  //               <div className="dropdown dropdown-end">
  //                   <label
  //                     tabIndex={0}
  //                     className="btn bg-transparent outline-none border-0 hover:bg-transparent"
  //                   >
  //                     <Avatar
  //                       className="absolute -z-10 text-[#ff6a3d] pointer-events-none w-7 h-7"
  //                       img={
  //                         user
  //                           ? `${user.photo}`
  //                           : undefined
  //                       }
  //                       rounded={true}
  //                       status="online"
  //                       statusPosition="bottom-right"
  //                     ></Avatar>
  //                   </label>
  //                   <ul
  //                     tabIndex={0}
  //                     className="dropdown-content menu p-2 shadow rounded-box w-52 bg-white"
  //                   >
  //                     <Dropdown.Header>
  //                       <span className="block text-sm truncate">
  //                         {user && user.fullname}
  //                       </span>
  //                       <span className="block truncate text-sm font-medium">
  //                         {user && user.email}
  //                       </span>
  //                     </Dropdown.Header>

  //                     <Dropdown.Item onClick={handleUsers}>
  //                       See all friend
  //                     </Dropdown.Item>
  //                     <Dropdown.Divider />
  //                     <Dropdown.Item 
  //                       onClick={() => {
  //                         navigate('/changeimg')
  //                       }}
  //                     >
  //                       Pick an Avatar
  //                     </Dropdown.Item>
  //                     <Dropdown.Divider />
  //                     <Dropdown.Item onClick={() => navigate('/changeinfor')}>
  //                       Change information
  //                     </Dropdown.Item>
  //                     <Dropdown.Divider />
  //                     <Dropdown.Item onClick={() => {
  //                       const token = ''
  //                       localStorage.setItem('token', token)
  //                       const config = {
  //                         header: {
  //                           Authorization: `Bearer ${token}`
  //                         }
  //                       }
  //                       axios.post(`https://web-project-wzlk.onrender.com/chat-app/logout/`, config)
  //                         .then(response => console.log(response.data))
  //                       // navigate("/signup")
  //                     }}>Sign out</Dropdown.Item>
  //                   </ul>
  //               </div>
  //             </div>

  //           </div>
  //         </div>

        
        
  //     </div>
  //   </>
  // );

  const handleLogout = () => {
      const token = localStorage.getItem('token')
        const helo = {
            headers: { 'Authorization': `Bearer ${token}` }
        };
        axios.post("https://web-project-wzlk.onrender.com/chat-app/logout/?format=json",{}, helo)
        .then((res) => {
          // console.log(res);
          if (res.data.message === 'logout') {
            console.log('seccc')
            localStorage.setItem('token', '')
            localStorage.setItem('user', '')
            navigate("/signup")
          } else {
            console.log(res)
          }
        })

      
    
  }

  return (
    <>     
      
      
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 fixed w-full top-0 nav_bar" >
        <div className="container flex flex-wrap items-center justify-between mx-auto">
        <a href="/" className="flex items-center">
            <img src="/image/logo2.png" className="h-6 mr-3 sm:h-9" alt="" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Live Chat</span>
        </a>
        <div className="flex items-center md:order-2">
            <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom" onClick={handleToggle}>
              <span className="sr-only">Open user menu</span>
              <img 
                className="w-8 h-8 rounded-full" 
                src="/image/logo2.png" 
                alt="user photo"
              />
            </button>
            <div 
              className={toggle ? 
                (`z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded  dark:bg-gray-700 dark:divide-gray-600  `) : 
                (`z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded  dark:bg-gray-700 dark:divide-gray-600 hidden`)}
              id="user-dropdown"
              style={{
                backgroundColor: '#fff',
                width: "208px",
                float: "right",
                position: "fixed",
                zIndex: "999",
                inset: "0px auto auto 0px",
                marginLeft: 'auto',
                marginRight: '0',
                top: '62px',
                right: '20px',
                // transform: "translate(calc(1483px), 60px)"
              }}
              data-popper-placement="bottom"
            >
              <div className="px-4 py-3">
                  {myself ? (<span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">{myself.name}</span>): 
                    (<span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>)
                  }
                  
                  
              </div>
              <ul className="py-1" aria-labelledby="user-menu-button">
                {/* <li>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
                </li> */}
                <li>
                  <a href="/changeimg" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Set avatar</a>
                </li>
                <li>
                  <a href="/changepass" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Change password</a>
                </li>
                <li>
                  <a 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
                    onClick={handleLogout}
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>

            <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="true" onClick={handleToggle1}>
              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          </button>
        </div>
        <div 
          className={toggle1 ? ("items-center justify-between block w-full md:flex md:w-auto md:order-1 z-50"): ("items-center justify-between hidden w-full md:flex md:w-auto md:order-1 z-50")} 
          id="mobile-menu-2"
        >
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a href="/" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Home</a>
            </li>
            <li>
              <a href="/users" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">See all friend</a>
            </li>
            <li>
              <a href="/changeinfor" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
            </li>
            {/* <li>
              <a href="#" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Pricing</a>
            </li>
            <li>
              <a href="#" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
            </li> */}
          </ul>
        </div>
        </div>
      </nav>


    </>
  )
};

export default Header;
