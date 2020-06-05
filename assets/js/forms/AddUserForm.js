import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../../css/forms/UserForms.scss';

const AddUserForm = (props) => {
    const initialFormState = { id: null, firstname: '', lastname: '', avatar: '', email: '' }
    const [ user, setUser ] = useState(initialFormState)
    const uploadedImage = React.useRef(null);

    const handleSubmit = e => {
        e.preventDefault();

        if (!user.email || !user.firstname || !user.lastname) return

        axios.post('http://localhost:8000/api/add', user, {
            method: 'post',
            body: JSON.stringify(user),
        })
            .then(response => {
                if(response.data.message.level === 'error') {
                    console.log(response.data.message.level)
                } else {
                    props.addUser(response.data.message.user)
                    setUser(initialFormState)
                    uploadedImage.current.className = "d-none"
                    localStorage.setItem('avatar-' + response.data.message.user.id, uploadedImage.current.src);
                }
            }).catch(error => {
                console.error(error);
            });
    }

    const handleImageUpload = e => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })

        const [file] = e.target.files;
        if (file) {
            const reader = new FileReader();

            uploadedImage.current.file = file;
            reader.onload = e => {
                uploadedImage.current.src = e.target.result;
                uploadedImage.current.className = "avatar"
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = e => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    return (
        <form onSubmit={handleSubmit} className="addEditForm">
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control"
                       placeholder="Enter email" value={user.email} name="email" onChange={handleChange} />
            </div>

            <div className="form-group">
                <label htmlFor="lastname">Last name</label>
                <input type="text" className="form-control"
                       placeholder="Last name" value={user.lastname} name="lastname" onChange={handleChange} />
            </div>

            <div className="form-group">
                <label htmlFor="firstname">First name</label>
                <input type="text" className="form-control"
                       placeholder="First name" value={user.firstname} name="firstname" onChange={handleChange} />
            </div>


            <div className="form-group">
                <label htmlFor="avatar">Avatar</label>
                <input type="file" className="form-control" value='' name="avatar" accept="image/*" multiple={false} onChange={handleImageUpload}/>
            </div>

            <div className="form-group">
                <img className={localStorage.getItem("avatar-" + user.id) === null ? "d-none" : "avatar"} ref={uploadedImage} />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="button" className="btn btn-info" onClick={() => props.setEditing(false)}>Cancel</button>
        </form>
    )
}

export default AddUserForm;