import Document, {Html, Head, Main, NextScript} from 'next/document'


class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    {/* eslint-disable-next-line @next/next/no-title-in-document-head */}
                    <title>Astra Honda Pontianak</title>
                    <meta name = "description" content = {'Astra Honda Pontianak'}/>
                    <meta name = "keywords" content = {'Astra Honda Pontianak'}/>
                    <meta name = "viewport" content = {'width=device-width, initial-scale=1.0'}/>
                    <link rel = "icon" href = "../../public/img/logo-astra-only.png"/>
                    <link rel = "preconnect" href = "https://fonts.googleapis.com"/>
                    <link rel = "preconnect" href = "https://fonts.gstatic.com" crossOrigin = ""/>
                    <link
                        href = "https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700&family=Pacifico&family=Roboto&display=swap"
                        rel = "stylesheet"/>
                    <link href = "https://fonts.googleapis.com/icon?family=Material+Icons"
                          rel = "stylesheet"/>
                    {/*<link rel = "shortcut icon" href = {require('../../public/img/logo3.png')}/>*/}
                    {/*<link rel = "apple-touch-icon"*/}
                    {/*      href = {require('../../public/img/logo3.png')}/>*/}
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}

export default MyDocument
