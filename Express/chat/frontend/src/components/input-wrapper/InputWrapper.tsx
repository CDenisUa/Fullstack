// Core
import { FC} from 'react';
// Types
import { InputWrapperPropTypes } from './InputWrapper.types';

const InputWrapper: FC<InputWrapperPropTypes> = (props) => {
    const { children, icon, title } = props;
    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text form-medium">{title}</span>
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {icon}
                </div>
                { children }
            </div>
        </div>
    );
}

export default InputWrapper;