// Core
import {FC, memo} from 'react';
// Types
import type { ContactsPropTypes } from './Contacts.types.ts';
// Components
import { ContactButton } from '../../../components/chat'

const Contacts: FC<ContactsPropTypes> = ({ users }) => (
    <div className='overflow-y-auto w-full py-3'>
        { users.map(user => <ContactButton user={user} />) }
    </div>
);

export default memo(Contacts);