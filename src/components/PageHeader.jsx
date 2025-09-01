// src/components/PageHeader.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const PageHeader = ({
  title,
  subtitle,
  showBackButton = true,
  backTo = "/",
  backLabel = "Back",
  actionButton,
  children,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
      {/* Left side - Back button + Title */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        {showBackButton && (
          <>
            <button
              onClick={() => navigate(backTo)}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md sm:rounded-lg transition-colors self-start"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span className="whitespace-nowrap">{backLabel}</span>
            </button>
            <div className="hidden sm:block border-l border-gray-300 h-6" />
          </>
        )}

        <div className="min-w-0 flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-gray-600 mt-1 text-sm sm:text-base leading-relaxed max-w-none sm:max-w-lg">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right side - Action button or custom content */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 justify-start sm:justify-end">
        {children}
        {actionButton && (
          <button
            onClick={actionButton.onClick}
            disabled={actionButton.disabled || actionButton.loading}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md sm:rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 transform hover:-translate-y-0.5 disabled:transform-none min-w-max"
          >
            {actionButton.loading ? (
              <>
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span className="text-sm sm:text-base">
                  {actionButton.loadingText || "Loading..."}
                </span>
              </>
            ) : (
              <>
                {actionButton.icon && (
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={actionButton.icon}
                    />
                  </svg>
                )}
                <span className="text-sm sm:text-base whitespace-nowrap">
                  {actionButton.label}
                </span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
