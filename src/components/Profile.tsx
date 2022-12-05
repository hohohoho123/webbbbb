import React, { useEffect, useState } from 'react'
import axios from 'axios'


const Profile : React.FC = () => {
    const user1 = {
        name: 'Võ Đắc Lực',
        avt: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/314657475_2215137945336436_1796223546990780693_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=zJBtA2agvisAX_wfMfL&_nc_ht=scontent.fsgn4-1.fna&oh=00_AfDf1drS_nTB8hb77HGM84Y4wNPzxNegbXS7ZnpLA0BzNw&oe=637F8502',
        cover: 'https://scontent.fsgn3-1.fna.fbcdn.net/v/t39.30808-6/315093257_2217312918452272_2951054123476202727_n.jpg?stp=dst-jpg_p960x960&_nc_cat=104&ccb=1-7&_nc_sid=e3f864&_nc_ohc=K87oE-wkwIEAX-fvOYP&_nc_ht=scontent.fsgn3-1.fna&oh=00_AfC695nOrqqqaifQjEzu30BhSjsgzxH9quxNJinmXV5exA&oe=63801DFA',
        location: 'Dĩ An, Bình Dương',
        distance: '2 km',
        career: 'Front-end Developer',
        workplace: 'University of Information Technology',
        description: 'Độc thân, vui tính và thích nhảy Hip hop',
        marital: 'Độc thân',
        id: 1,
    }

    const [user, setUser] = useState<any>(undefined)

    useEffect(() => {
        const token = localStorage.getItem('token')
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.get('https://web-project-wzlk.onrender.com/chat-app/profile/?format=json', config)
            .then((res) => {
                setUser(res.data[0])
            })
    },[])
    
    console.log(user)
    

    return (
        <div>
            {user ? (<div className='h-screen overflow-hidden flex items-center justify-center' style={{background: "#f1f5f9"}}>
                <main className="profile-page">
                    <section className="relative block h-500-px">
                        <div 
                            className="absolute top-0 w-full h-full bg-center bg-cover" 
                            style={{backgroundImage: `url(${user1.cover})`}}     
                        >
                        <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
                        </div>
                        <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px" style={{transform: 'translateZ(0px)'}}>
                        <svg 
                            className="absolute bottom-0 overflow-hidden" 
                            xmlns="http://www.w3.org/2000/svg" 
                            preserveAspectRatio="none" 
                            version="1.1" 
                            viewBox="0 0 2560 100" 
                            x="0" y="0"
                        >
                            <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
                        </svg>
                        </div>
                    </section>
                    <section className="relative py-16 bg-blueGray-200">
                        <div className="container mx-auto px-4">
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                            <div className="px-6">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                <div className="relative">
                                    <img 
                                        alt="..." 
                                        src={user.photo}
                                        className="shadow-xl rounded-full h-158 w-158 align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                                    />
                                </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                <div className="py-6 px-3 mt-32 sm:mt-0">
                                    <div 
                                    className={`bg-red-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150`} 
                                    style={{
                                        float: 'right',
                                    }}
                                    >
                                    {user.relationship}
                                    </div>
                                </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                    <div className="mr-4 p-3 text-center">
                                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600"></span><span className="text-sm text-blueGray-400"></span>
                                    </div>
                                    <div className="mr-4 p-3 text-center">
                                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600"></span><span className="text-sm text-blueGray-400"></span>
                                    </div>
                                    <div className="lg:mr-4 p-3 text-center">
                                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600"></span><span className="text-sm text-blueGray-400"></span>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className="text-center mt-12">
                                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                {user.name}
                                </h3>
                                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                {user.location}
                                </div>
                                <div className="mb-2 text-blueGray-600 mt-10">
                                <i className="fas fa-phone mr-2 text-lg text-blueGray-400"></i>
                                {user.phone_number}
                                </div>
                                <div className="mb-2 text-blueGray-600">
                                <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                                {user1.workplace}
                                </div>
                            </div>
                            <div className="mt-10 py-10 border-t border-blueGray-200 text-center" style={{width: '1450px'}}>
                                <div className="flex flex-wrap justify-center">
                                <div className="w-full lg:w-9/12 px-4">
                                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                    {user.description}
                                    </p>
                                    <a href="#pablo" className="font-normal text-pink-500">Show more</a>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </section>
                </main>
            </div>) : ('')}
        </div>
    )
}

export default Profile