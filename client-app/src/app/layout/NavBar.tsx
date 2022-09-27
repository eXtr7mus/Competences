import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, Container, Dropdown, Menu, Image } from 'semantic-ui-react';
import { useStore } from '../stores/store';

export default observer(function NavBar() {
    const {competenceStore} = useStore();
    const {userStore: {user, logout}} = useStore();

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    Competences
                </Menu.Item>
                <Menu.Item name='Competences' as={Link} to={'/competences'}/>
                <Menu.Item name='Issues' as={Link} to={'/issues'}/>
                <Menu.Item name='Users' as={Link} to={'/users'}/>
                <Menu.Item position='right'>
                    <Button as={NavLink} to={'/createCompetence'} positive content='Create Competence' />
                </Menu.Item>
                <Menu.Item position='right'>
                    <Image src={user?.image || '/assets/user.png'} avatar spaced='right'/>
                    <Dropdown pointing='top left' text={user?.displayName}>
                        <Dropdown.Menu>
                            <Dropdown.Item as={NavLink} to={`/profiles/${user?.username}`} text='My Profile' icon='user'/>
                            <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    )
})