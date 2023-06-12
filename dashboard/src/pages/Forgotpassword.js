import React from 'react'
import CustomInput from '../components/CustomInput'

const Forgotpassword = () => {
  return (
    <div className='py-5' style={{ background: '#ffd333', minHeight:'100vh'}}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className='my-5 w-25 bg-white rounded-3 mx-auto p-3'>
        <h3 className='text-center title'>Reset Password</h3>
        <p className='text-center'>Please enter your register email to get reset password mail.</p>
        <form>
          <CustomInput type='text' label='Email Address' id='email'></CustomInput>
          <button className='border-0 px-3 py-2 w-100' style={{ background: '#ffd333'}} type='submit'>Send Link</button>
        </form>
      </div>
    </div>
  )
}

export default Forgotpassword