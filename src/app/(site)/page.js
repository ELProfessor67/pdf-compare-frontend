'use client'
import axios from 'axios';
import React, { useState } from 'react'

const page = () => {
  // const serverUrl = 'http://127.0.0.1:5000'
  const serverUrl = 'https://backend.whizardofodds.com'
  const [pdf1, setPdf1] = useState();
  const [pdf2, setPdf2] = useState();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);


  const handlePdfUpload = (e,setFile) => {
    const [file] = e.target.files;
    setFile(file)
  }

  const handleScan = async () => {
    if(!pdf1 || !pdf2) return
    try {
      setLoading(true)
      const formData = new FormData();
      formData.append('pdf1',pdf1)
      formData.append('pdf2',pdf2)

      const res = await axios.post(`${serverUrl}/compare_pdfs`,formData,{headers: {
        'Content-Type': 'multipart/form-data'
      }})

      setResult(res.data);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error.message)
    }
  }


  return (
    <section className='min-h-[100vh] w-full bg-bg-1 py-10 px-16'>
      <input type='file' id='pdf1' hidden onChange={(e) => handlePdfUpload(e,setPdf1)}/>
      <input type='file' id='pdf2' hidden onChange={(e) => handlePdfUpload(e,setPdf2)}/>

      <h1 className='text-center text-3xl text-white mb-10'>PDF Compare</h1>
        <div className='flex items-center justify-center gap-8'>
          <button className='py-2 px-4 bg-bg-2 rounded-md text-white' onClick={() => document.getElementById('pdf1').click()}>
            upload pdf 1
          </button>
          <button className='py-2 px-4 bg-bg-2 rounded-md text-white' onClick={() => document.getElementById('pdf2').click()}>
            upload pdf 2
          </button>
        </div>

        <div className='flex items-center justify-center gap-8 mt-10'>
        <button className='py-2 px-4 bg-foreground-1 rounded-md text-white' onClick={handleScan}>
            Compare 
          </button>
        </div>
        {
          loading &&
          <div className='w-full flex items-center justify-center h-[70vh]'>
            <div class="loader"></div>
          </div>
        }

        {
          result && !loading &&
          <div className='w-full mt-20' dangerouslySetInnerHTML={{ __html: result}}>
          
          </div>

        }
        
    </section>
  )
}

export default page