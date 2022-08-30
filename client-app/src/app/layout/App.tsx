import { useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Container } from 'semantic-ui-react';
import CompetencesDashboard from '../../features/competences/dashboard/CompetencesDashboard';
import CompetenceDetails from '../../features/competences/details/CompetenceDetails';
import CompetenceForm from '../../features/competences/form/CompetenceForm';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import HomePage from '../../features/home/HomePage';
import ProfileEditForm from '../../features/profiles/forms/ProfileEditForm';
import UserProfilePage from '../../features/profiles/UserProfilePage';
import UsersList from '../../features/profiles/UsersList';
import LoginForm from '../../features/users/LoginForm';
import ModalContainer from '../common/modals/modalContainer';
import { useStore } from '../stores/store';
import NavBar from './NavBar';

export default function App() {

  const location = useLocation();
  const {commonStore, userStore} = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])


  return (
    <>
      <ToastContainer position ='bottom-right' hideProgressBar />
      <ModalContainer />
      <Route exact path='/' component={HomePage} />
      <Route 
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container style={{marginTop: '7em'}}>
              <Switch>
                <Route exact path='/competences' component={CompetencesDashboard} />
                <Route path='/server-error' component={ServerError} />
                <Route path='/login' component={LoginForm} />
                <Route path='/users' component={UsersList} />
                <Route exact key={location.key} path='/profiles/:username' component={UserProfilePage} />
                <Route key={location.key} path={['/competence/:id/edit', '/createCompetence']} component={CompetenceForm} />
                <Route key={location.key} path='/competence/:id' component={CompetenceDetails} />   
                <Route path='/profiles/:username/edit' component={ProfileEditForm} />   
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
}


