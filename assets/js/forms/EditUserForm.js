import React, {useState, useEffect} from 'react';
import axios from 'axios';

const EditUserForm = (props) => {
    const uploadedImage = React.useRef(null);
    const { current } = uploadedImage;

    useEffect(() => {
        setUser(props.currentUser)
    }, [props])

    const [user, setUser] = useState(props.currentUser);

    const handleChange = e => {
        const {name, value} = e.target;
        setUser({...user, [name]: value});
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (!user.email || !user.firstname || !user.lastname) return

        axios.put('http://localhost:8001/api/update/' + user.id, user, {
            method: 'PUT',
            body: JSON.stringify(user),
        })
            .then(response => {
                if(response.data.message.level === 'error') {

                } else {
                    props.updateUser(user.id, user);
                    localStorage.setItem('avatar-' + response.data.message.user.id, current.src);
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

    return (
        <form onSubmit={handleSubmit} className="addEditForm">
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control"
                       placeholder="Enter email" value={user.email} name="email" id="email" onChange={handleChange} />
            </div>

            <div className="form-group">
                <label htmlFor="lastname">Last name</label>
                <input type="text" className="form-control"
                       placeholder="Last name" value={user.lastname} name="lastname" id="lastname" onChange={handleChange} />
            </div>

            <div className="form-group">
                <label htmlFor="firstname">First name</label>
                <input type="text" className="form-control"
                       placeholder="First name" value={user.firstname} name="firstname" id="firstname" onChange={handleChange} />
            </div>

            <div className="form-group">
                <label htmlFor="avatar">Avatar</label>
                <input type="file" className="form-control" value='' name="avatar" accept="image/*" multiple={false} onChange={handleImageUpload}/>
            </div>

            <div className="form-group">
                <img className={localStorage.getItem("avatar-" + user.id) === null ? "d-none" : "avatar"} ref={uploadedImage} src={localStorage.getItem('avatar-' + user.id)} />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="button" className="btn btn-info" onClick={() => props.setEditing(false)}>Cancel</button>
        </form>
    )
}

export default EditUserForm;