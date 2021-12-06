import {css} from "@emotion/react";
import {MoonLoader} from "react-spinners";

const override = css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
`;

export default function Spinner() {
    return (
        <MoonLoader color={'#0275d8'} loading={true} css={override} size={50}/>
    );
}
