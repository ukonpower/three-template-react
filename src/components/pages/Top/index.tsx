import style from './index.module.scss';

import { GLCanvas } from '~/components/ui/GLCanvas';
import { Panel } from '~/components/ui/Parts/Panel';
import { PanelContainer } from '~/components/ui/Parts/PanelContainer';
import { GLContext } from '~/features/GL/contexts/GLContext';
import { useGLContext } from '~/features/GL/hooks/useGLContext';


export const TopPage = () => {

	const glContext = useGLContext();

	return <div className={style.top}>
		<GLContext.Provider value={glContext}>
			<PanelContainer >
				<Panel title="Panel" >
					<GLCanvas />
				</Panel>
			</PanelContainer>
		</GLContext.Provider>
	</div>;

};
