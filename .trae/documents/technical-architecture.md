## 1. 架构设计

```mermaid
flowchart TD
    "纯前端应用" --> "React 组件层"
    "React 组件层" --> "CountdownDisplay 倒计时组件"
    "React 组件层" --> "PhaseBar 阶段条组件"
    "React 组件层" --> "ModeToggle 模式切换组件"
    "React 组件层" --> "SafetyWarning 安全警告组件"
    "React 组件层" --> "ScienceModal 科普弹窗组件"
    "React 组件层" --> "App 主页面"
    "App 主页面" --> "Zustand Store 状态管理"
    "Zustand Store 状态管理" --> "阶段时刻数据(内置)"
    "Zustand Store 状态管理" --> "当前模式(室内/户外)"
    "Zustand Store 状态管理" --> "弹窗状态"
```

## 2. 技术说明

- **前端**：React@18 + TypeScript + Tailwind CSS@3 + Vite
- **初始化工具**：vite-init（react-ts 模板）
- **后端**：无（纯前端）
- **数据库**：无（阶段时刻与科普文案硬编码）
- **状态管理**：Zustand
- **图标**：lucide-react

## 3. 路由定义

| 路由 | 用途 |
|------|------|
| / | 倒计时主屏（唯一页面） |

## 4. 组件结构

```
src/
├── components/
│   ├── CountdownDisplay.tsx    # 倒计时大字显示
│   ├── PhaseBar.tsx            # 阶段进度条
│   ├── ModeToggle.tsx          # 室内/户外模式切换
│   ├── SafetyWarning.tsx       # 户外模式安全警告
│   └── ScienceModal.tsx        # 科普弹窗
├── hooks/
│   └── useCountdown.ts         # 倒计时计算 hook
├── store/
│   └── useEclipseStore.ts      # Zustand 状态管理
├── data/
│   └── eclipsePhases.ts        # 阶段时刻与科普数据
├── pages/
│   └── Home.tsx                # 主页面
├── App.tsx
└── main.tsx
```

## 5. 核心逻辑

### 5.1 倒计时计算

- 每秒通过 `setInterval` 计算当前时间与下一阶段时刻的时间差
- 判断当前处于哪个阶段区间
- 当日偏食事件未开始时，倒计时指向初亏时刻
- 当所有阶段已过时，显示"观测已结束"

### 5.2 户外模式安全逻辑

- 户外模式下检测当前时间是否在食甚时刻前后 3 分钟范围内
- 在该范围内时：阶段条食甚区域标红 + 顶部显示"禁止直视"闪烁警告
- 室内模式下不显示安全警告

### 5.3 模拟时间

- 为方便演示，提供日期选择或时间偏移功能，让用户可以模拟任意时刻查看效果
