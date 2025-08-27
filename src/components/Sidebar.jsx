import React from 'react';
import {
  Search,
  Plus,
  MessageSquare,
  Settings,
  LogOut,
  X,
  Archive,
  Trash2,
  Menu,
} from 'lucide-react';
// 自定义双面板图标组件
const PanelIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="3" width="7" height="18" rx="1" ry="1" />
    <rect x="14" y="3" width="7" height="18" rx="1" ry="1" />
  </svg>
);

const Sidebar = ({
  user,
  onLogout,
  sessions,
  currentSessionId,
  onNewChat,
  onSwitchSession,
  onDeleteSession,
  isCollapsed,
  onToggleCollapse,
  theme,
}) => {
  return (
    <div
      className={`${
        isCollapsed ? 'w-16' : 'w-80'
      } flex flex-col h-full border-r transition-all duration-300 ease-in-out overflow-hidden`}
      style={{
        backgroundColor: theme.colors.sidebar,
        borderRightColor: theme.colors.border,
      }}
    >
      {isCollapsed ? (
        <>
          <div className="flex-shrink-0 p-4">
            <button
              onClick={onToggleCollapse}
              className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
              style={{
                color: theme.colors.textMuted,
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = theme.colors.hover;
                e.target.style.color = theme.colors.text;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = theme.colors.textMuted;
              }}
            >
              <Menu size={18} />
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center space-y-3 px-2">
            <button
              onClick={onNewChat}
              className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
              style={{
                color: theme.colors.textMuted,
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = theme.colors.hover;
                e.target.style.color = theme.colors.text;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = theme.colors.textMuted;
              }}
              title="新聊天"
            >
              <Plus size={18} />
            </button>
            <button
              className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
              style={{
                color: theme.colors.textMuted,
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = theme.colors.hover;
                e.target.style.color = theme.colors.text;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = theme.colors.textMuted;
              }}
              title="搜索聊天"
            >
              <Search size={18} />
            </button>
          </div>

          <div className="flex-shrink-0 p-4">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-black">
                  {user?.name?.charAt(0)?.toUpperCase() || '1'}
                </span>
              </div>
              <button
                onClick={onLogout}
                className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
                style={{
                  color: theme.colors.textMuted,
                  backgroundColor: 'transparent',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = theme.colors.hover;
                  e.target.style.color = theme.colors.text;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = theme.colors.textMuted;
                }}
                title="退出登录"
              >
                <LogOut size={14} />
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex-shrink-0 p-4">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={onToggleCollapse}
                className="p-2 rounded-lg transition-colors"
                style={{
                  color: theme.colors.textMuted,
                  backgroundColor: 'transparent',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = theme.colors.hover;
                  e.target.style.color = theme.colors.text;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = theme.colors.textMuted;
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-1">
              <button
                onClick={onNewChat}
                className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors"
                style={{
                  color: theme.colors.text,
                }}
              >
                <MessageSquare
                  size={18}
                  className="flex-shrink-0"
                  style={{ color: theme.colors.textSecondary }}
                />
                <span className="font-medium truncate">新聊天</span>
              </button>

              <button className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors text-left">
                <Search
                  size={18}
                  className="flex-shrink-0"
                  style={{ color: theme.colors.text }}
                />
                <span className="truncate" style={{ color: theme.colors.text }}>
                  搜索聊天
                </span>
              </button>
            </div>
          </div>

          <div className="flex-1 min-h-0 overflow-hidden">
            <div className="h-full overflow-y-auto custom-scrollbar px-4">
              <div
                className="pt-4 mb-3"
                style={{
                  borderTopColor: theme.colors.border,
                  borderTopWidth: '1px',
                }}
              >
                <div
                  className="text-xs font-medium mb-3 px-1"
                  style={{ color: theme.colors.textMuted }}
                >
                  聊天记录
                </div>
              </div>

              <div className="space-y-1 pb-4">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className={`group flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                      currentSessionId === session.id ? 'border' : ''
                    }`}
                    style={{
                      backgroundColor:
                        currentSessionId === session.id
                          ? theme.colors.buttonSecondary
                          : 'transparent',
                      borderColor:
                        currentSessionId === session.id
                          ? theme.colors.border
                          : 'transparent',
                    }}
                    onMouseEnter={(e) => {
                      if (currentSessionId !== session.id) {
                        e.currentTarget.style.backgroundColor =
                          theme.colors.hover;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (currentSessionId !== session.id) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    <button
                      onClick={() => onSwitchSession(session.id)}
                      className="flex items-center space-x-3 flex-1 text-left min-w-0"
                    >
                      <MessageSquare
                        size={16}
                        className="flex-shrink-0"
                        style={{ color: theme.colors.textMuted }}
                      />
                      <span
                        className="text-sm truncate"
                        style={{ color: theme.colors.textSecondary }}
                      >
                        {session.title}
                      </span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteSession(session.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 transition-all flex-shrink-0"
                      style={{
                        color: theme.colors.textMuted,
                        backgroundColor: 'transparent',
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = theme.colors.error;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = theme.colors.textMuted;
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}

                {sessions.length === 0 && (
                  <div
                    className="text-sm text-center py-4"
                    style={{ color: theme.colors.textMuted }}
                  >
                    暂无聊天记录
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 p-4 mt-auto">
            <div
              className="rounded-lg p-3 flex items-center justify-between"
              style={{ backgroundColor: theme.colors.buttonSecondary }}
            >
              <div className="flex items-center space-x-3 min-w-0 flex-1">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-black">
                    {user?.name?.charAt(0)?.toUpperCase() || '1'}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div
                    className="text-sm font-medium truncate"
                    style={{ color: theme.colors.text }}
                  >
                    {user?.name || '1'}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: theme.colors.textMuted }}
                  >
                    Free
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-1 flex-shrink-0">
                <button
                  onClick={onLogout}
                  className="p-2 rounded-lg transition-colors"
                  style={{
                    color: theme.colors.textMuted,
                    backgroundColor: 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = theme.colors.hover;
                    e.target.style.color = theme.colors.text;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = theme.colors.textMuted;
                  }}
                >
                  <LogOut size={16} />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
