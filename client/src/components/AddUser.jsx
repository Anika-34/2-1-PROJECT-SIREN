import React, { Fragment, useState} from 'react'

function AddUser() {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [nid_number, setNid] = useState('');
  const [phone_number, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('1');

  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false)

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { first_name, last_name, nid_number, phone_number, email, password, gender };
      const response = await fetch("http://localhost:3001/users/", {    // fetch get req kore post set kore over write
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      //window.location = "/";
      if (response.status === 400) {
        setMessage('User already exists!');
      }
      else {
        setMessage('Your account is created successfully!')
      }
      setShowMessage(true);
      // console.log(response);
      // console.log("ok");

    } catch (err) {
      console.error(err.message);
    }
  };


  const closeMessage = () => {
    setShowMessage(false);
    if (message === 'Your account has been created!') {
      window.location = "/";
    }
  };


  return (
    <Fragment>
      <div className='top-spacing mb-3'>
        <form action="" onSubmit={onSubmitForm}>
          <div className="form-row">
            <div className='col-md-6 mb-2 '>
              <input type="text" className='form-control' placeholder='First name' value={first_name} onChange={e => setFirstName(e.target.value)} />
            </div>
            <div className='col-md-6 mb-2 '>
              <input type="text" className='form-control' placeholder='Last name' value={last_name} onChange={e => setLastName(e.target.value)} />
            </div>
            <div className='col-md-6 mb-2'>
              <input type="text" className='form-control' placeholder='NID number' value={nid_number} onChange={e => setNid(e.target.value)} />
            </div>
            <div className='col-md-6 mb-2'>
              <input type="text" className='form-control' placeholder='Phone number' value={phone_number} onChange={e => setPhone(e.target.value)} />
            </div>
            <div className='col-md-6 mb-2 '>
              <input type="text" className='form-control' placeholder='E-mail' value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className='col-md-6 mb-2'>
              <input type="text" className='form-control' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div className='col-md-6 mb-2'>
              <h5>Gender:</h5>
              <select className='custom-select my-10 mr-sm-12 ' value={gender} onChange={e => setGender(e.target.value)}>
                <option value='1'>Male</option>
                <option value='2'>Female</option>
                <option value='3'>Other</option>
              </select>
            </div>
            <button className="btn btn-primary">Register</button>
          </div>
        </form>
      </div>
      {showMessage && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Message</h5>
                <button type="button" className="close" onClick={closeMessage}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>{message}</p>
                <button type="button" className="btn btn-primary" onClick={closeMessage}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default AddUser;