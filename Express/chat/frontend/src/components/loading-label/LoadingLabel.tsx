// Core
import { FC } from 'react';
import { Loader2 } from 'lucide-react';
// Types
import type { LoadingLabelPropTypes } from "./LoadingLabel.types.ts";

const LoadingLabel: FC<LoadingLabelPropTypes> = (props) => {
    const { loading, label } = props;
    return (
        <>
            {
                loading ?
                    <>
                        <Loader2 className='h-5 w-5 animate-spin' />
                        <span className='ml-2'>Loading...</span>
                    </>
                    : label
            }
        </>
    );
}

export default LoadingLabel;