"use client"

import { useContext } from 'react'
import modalContext from '@/context/modalContext'
import Provider from '@/components/Provider'
import Navbar from '@/components/Navbar'
import PopupModal from '@/components/modals/PopupModal'
import Footer from '@/components/Footer'


export const metaData = {
    title: 'Elite Estates',
    description: 'Find the perfect house that suits your needs in the UAE'
}

export const Root = ({children}) => {
    return (
        <html>
            <body className='app'>
                <Provider>
                    <div className='main'></div>
                    <main className='app' id='main'  style={{ position:'relative' }}>
                        <PopupModal />
                        <Navbar />
                        {children}
                        <Footer />
                    </main>
                </Provider>
            </body>
        </html>
    )
}

export default Root;
