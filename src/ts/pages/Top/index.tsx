import style from './index.module.scss';

import { Panel } from '~/ts/components/ui/Panel';
import { PanelContainer } from '~/ts/components/ui/PanelContainer';
export const TopPage = () => {

	return <div className={style.top}>
		<PanelContainer >
			<Panel title="Panel" >
			</Panel>
		</PanelContainer>
	</div>;

};
