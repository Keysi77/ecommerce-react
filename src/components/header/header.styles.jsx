import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

// css je block csska ktore sa moze sharovat medzi dalsimi komponentami
// kod ktory sa pouziva viac ako 1 krat
const OptionContainerStyles = css`
	padding: 10px 15px;
	cursor: pointer;
`;

export const HeaderContainer = styled.div`
	height: 70px;
	width: 100%;
	display: flex;
	justify-content: space-between;
	margin-bottom: 25px;
`;
// ked sa styluje druhy komponent posle sa ako parameter do funkcie
export const LogoContainer = styled(Link)`
    height: 100%;
    width: 70px;
    padding: 25px;
`;

export const OptionsContainer = styled.div`
	width: 50%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;

// ked sa pouziva na viaceryh miestach
export const OptionLink = styled(Link)`
	${OptionContainerStyles}
	/* padding: 10px 15px;
	cursor: pointer; */
`;

export const OptionDiv = styled.div`${OptionContainerStyles};`;
// alebo pouzit as='div' v HTML a staci kazdemu dat <OptionLink> tym padom OptionDiv bdue nepotrebny
