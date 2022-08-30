import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { Link, useHistory } from "react-router-dom";
import MyTextArea from "../../../app/common/form/MyTextArea";
import { ProfileFormValues } from "../../../app/models/UserProfile";
import PhotoUploadWidget from "../../../app/common/imageUpload/PhotoUploadWidget";

export default observer(function ProfileEditForm() {

    const history = useHistory();
    const {profileStore, userStore} = useStore();
    const {getProfile, userProfile, updateProfile, uploadPhoto, uploading, deletePhoto} = profileStore;
    const {user, setDisplayName} = userStore;

    const [profile, setProfile] = useState<ProfileFormValues>(new ProfileFormValues());

    const validationSchema = Yup.object({
        displayName: Yup.string().required('The display name is required'),
    })

    const [addPhotoMode, setAddPhotoMode] = useState(false);

    useEffect(() => {
        if (user?.username) getProfile(user?.username).then(() => setProfile(new ProfileFormValues(userProfile)));
    }, [user?.username, getProfile])

    function handleFormSubmit(profile: ProfileFormValues) {
        updateProfile(profile).then(() => setDisplayName(profile.displayName)).then(() => history.push(`/Profiles/${profile.username}`));
    }

    function handlePhotoUpload(file: Blob) {
        uploadPhoto(file).then(() => setAddPhotoMode(false)).then(() => profile.image = user?.image);
    }

    function handlePhotoDelete() {
        deletePhoto().then(() => profile.image = user?.image);
    }

    return(
        <Segment clearing>
            <Header content='Edit profile' sub color='teal' />
            <Formik 
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={profile} 
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                            <MyTextInput name='displayName' placeholder='Display Name' />                            
                            <MyTextArea placeholder='Bio' name='bio' rows={3} />
                            <Button 
                                disabled={isSubmitting || !isValid }
                                loading={isSubmitting} floated='right' 
                                positive type='submit' content='Submit'
                            />
                            { <Button as={Link} to={`/profiles/${user?.username}`} floated='right' type='button' content='Back to profile'/> }
                        </Form>
                )}
            </Formik>
            {addPhotoMode ?
                 
                <>
                    <PhotoUploadWidget loading={uploading} uploadPhoto={handlePhotoUpload} />
                    <Button onClick={() => setAddPhotoMode(false)} floated='right' type='button' content='Cancel'/>
                </>
                :
                <>
                    <Button onClick={() => setAddPhotoMode(true)} floated='right' type='button' content='Update profile photo'/>
                    <Button onClick={() => deletePhoto()} loading={uploading} floated='right' type='button' content='Delete profile photo'/>
                </>
            }
            
        </Segment>
    )
})