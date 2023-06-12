import React from 'react'
import CustomInput from '../components/CustomInput'

const Resetpassword = () => {
  return (
    <div className='py-5' style={{ background: '#ffd333', minHeight:'100vh'}}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className='my-5 w-25 bg-white rounded-3 mx-auto p-4'>
        <h3 className='text-center title'>Forgot Password</h3>
        <p className='text-center'>Please enter your new password.</p>
        <form>
          <CustomInput type='password' label='New password' id='pass'></CustomInput>
          <CustomInput type='password' label='Confirm password' id='pass'></CustomInput>
          <button className='border-0 px-3 py-2 w-100' style={{ background: '#ffd333'}} type='submit'>Reset password</button>
        </form>
      </div>
    </div>
  )
}

export default Resetpassword