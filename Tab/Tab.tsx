import React, { type CSSProperties, type ReactNode } from 'react';
import classNames from 'classnames';
import styles from './Tab.module.scss';

// Sub-components
import { TabList } from './components/List/List';
import { TabTrigger } from './components/Trigger/Trigger';
import { TabContent } from './components/Content/Content';

// CSS Variables
import { TabContext } from '@/shared/headless/Tab/Tab';
interface CSSCustomProperties extends CSSProperties {
  '--tab-active-color'?: string;
  '--tab-border-color'?: string;
  '--tab-text-color'?: string;
}

// 사용예시
// 음 아무리 생각해도 이건 다시 만들어야 할꺼 같은데? ㅋㅋ
// const TabExample = () => {
//   const [activeTab, setActiveTab] = useState('home');

//   return (
//     <div style={{ padding: 40, maxWidth: 600 }}>

//       {/* Tab Root */}
//       <Tab value={activeTab} onChange={setActiveTab}>

//         {/* 1. Tab List (메뉴) */}
//         <Tab.List>
//           <Tab.Trigger value="home">
//             <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
//               <FaHome /> 홈
//             </span>
//           </Tab.Trigger>

//           <Tab.Trigger value="profile">
//             <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
//               <FaUser /> 프로필
//             </span>
//           </Tab.Trigger>

//           <Tab.Trigger value="settings">
//             <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
//               <FaCog /> 설정
//             </span>
//           </Tab.Trigger>

//           <Tab.Trigger value="disabled" disabled>
//             비활성
//           </Tab.Trigger>
//         </Tab.List>

//         {/* 2. Tab Contents (내용) */}
//         <div style={{ padding: '20px 0', minHeight: 200 }}>

//           <Tab.Content value="home">
//             <h3>홈 화면</h3>
//             <p>환영합니다! 메인 대시보드입니다.</p>
//           </Tab.Content>

//           <Tab.Content value="profile">
//             <h3>내 정보</h3>
//             <p>사용자 프로필 설정 화면입니다.</p>
//           </Tab.Content>

//           {/* Settings는 DOM에 항상 남겨둠 (keepMounted) -> 입력값 유지 등 필요시 */}
//           <Tab.Content value="settings" keepMounted>
//             <h3>환경 설정</h3>
//             <p>설정을 변경하세요. (다른 탭 갔다 와도 이 텍스트는 다시 렌더링되지 않음)</p>
//           </Tab.Content>

//         </div>

//       </Tab>
//     </div>
//   );
// };

export interface TabProps {
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const TabMain = ({ value, onChange, children, className, style }: TabProps) => {
  return (
    <TabContext.Provider value={{ value, onChange }}>
      <div className={classNames(styles.Root, className)} style={style as CSSProperties}>
        {children}
      </div>
    </TabContext.Provider>
  );
};

// Compound Component
export const Tab = Object.assign(TabMain, {
  List: TabList,
  Trigger: TabTrigger,
  Content: TabContent,
});

export default Tab;
