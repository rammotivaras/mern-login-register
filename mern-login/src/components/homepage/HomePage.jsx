import './HomePage.css';
// eslint-disable-next-line react/prop-types
const HomePage = ({setLoginUser}) => {
  return (
    <div className='homepage'>
    <h1>Hello homepage</h1>
    <div className='button' onClick={()=> setLoginUser({}) }>
        LogOut
    </div>
    </div>
  )
}

export default HomePage