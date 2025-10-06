/**
 * DataPrivacyScreen - Pantalla de privacidad de datos
 * Configuración aislada y escalable basada en el CSS del Figma
 */
import React from "react";

const DataPrivacyScreen = ({
  screenSettings = {},
  clientId,
  config,
  screenId,
  onNavigate,
  availableScreens = [],
  ...props
}) => {
  if (!config) {
    return (
      <div className="h-full flex items-center justify-center bg-white">
        <div className="text-center text-gray-600">
          <p>Loading configuration...</p>
        </div>
      </div>
    );
  }

  // Configuración específica de la pantalla
  const backgroundColor =
    screenSettings?.background_color ||
    config?.colors_json?.background ||
    "#ffffff";
  const primaryColor =
    screenSettings?.primary_color || config?.colors_json?.primary || "#017755";
  const secondaryColor =
    screenSettings?.secondary_color ||
    config?.colors_json?.secondary ||
    "#64748b";
  const accentColor =
    screenSettings?.accent_color || config?.colors_json?.accent || "#f97316";

  // Configuración de navegación
  const navigationConfig = screenSettings?.navigation_config || {};
  const acceptButtonNavigation = navigationConfig?.accept_button;
  const eulaLinkNavigation = navigationConfig?.eula_link;
  const privacyPolicyNavigation = navigationConfig?.privacy_policy_link;

  // Handlers para elementos clicables
  const handleAcceptClick = () => {
    if (acceptButtonNavigation?.target_screen_id && onNavigate) {
      console.log("🔄 Navigating to:", acceptButtonNavigation.target_screen_id);
      onNavigate(acceptButtonNavigation.target_screen_id);
    } else {
      // Fallback a demo
      console.log("Accept & Continue - Demo functionality");
    }
  };

  const handleEulaClick = () => {
    if (eulaLinkNavigation?.target_screen_id && onNavigate) {
      console.log("🔄 Navigating to:", eulaLinkNavigation.target_screen_id);
      onNavigate(eulaLinkNavigation.target_screen_id);
    } else {
      // Fallback a demo
      console.log("EULA - Demo functionality");
    }
  };

  const handlePrivacyPolicyClick = () => {
    if (privacyPolicyNavigation?.target_screen_id && onNavigate) {
      console.log(
        "🔄 Navigating to:",
        privacyPolicyNavigation.target_screen_id
      );
      onNavigate(privacyPolicyNavigation.target_screen_id);
    } else {
      // Fallback a demo
      console.log("Privacy Policy - Demo functionality");
    }
  };

  return (
    <div
      className="h-full w-full"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0px",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#F5F5F5",
      }}
    >
      {/* App Top Bar */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0px",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "stretch",
          flexShrink: "0",
          position: "relative",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Status Bar */}
        <div
          style={{
            padding: "21px 16px 19px 16px",
            display: "flex",
            flexDirection: "row",
            gap: "154px",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: "0",
            width: "100%",
            position: "relative",
          }}
        >
          {/* Time */}
          <div
            style={{
              padding: "2px 0px 0px 0px",
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              alignItems: "center",
              justifyContent: "center",
              flex: "1",
              height: "22px",
              position: "relative",
            }}
          >
            <div
              style={{
                color: "#000000",
                textAlign: "center",
                fontFamily: "SfPro-Semibold, sans-serif",
                fontSize: "17px",
                lineHeight: "22px",
                fontWeight: "600",
                position: "relative",
              }}
            >
              9:41
            </div>
          </div>

          {/* Levels */}
          <div
            style={{
              padding: "1px 0px 0px 0px",
              display: "flex",
              flexDirection: "row",
              gap: "7px",
              alignItems: "center",
              justifyContent: "center",
              flex: "1",
              height: "22px",
              position: "relative",
            }}
          >
            {/* Cellular Connection */}
            <svg width="19.2" height="12.23" viewBox="0 0 20 13" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.3652 1.53301C19.3652 0.899963 18.8876 0.38678 18.2985 0.38678H17.2318C16.6427 0.38678 16.1652 0.899963 16.1652 1.53301V11.467C16.1652 12.1 16.6427 12.6132 17.2318 12.6132H18.2985C18.8876 12.6132 19.3652 12.1 19.3652 11.467V1.53301ZM11.931 2.83206H12.9977C13.5868 2.83206 14.0644 3.35756 14.0644 4.0058V11.4395C14.0644 12.0877 13.5868 12.6132 12.9977 12.6132H11.931C11.3419 12.6132 10.8644 12.0877 10.8644 11.4395V4.0058C10.8644 3.35756 11.3419 2.83206 11.931 2.83206ZM7.59928 5.48111H6.53261C5.94351 5.48111 5.46594 6.0133 5.46594 6.66979V11.4245C5.46594 12.081 5.94351 12.6132 6.53261 12.6132H7.59928C8.18838 12.6132 8.66594 12.081 8.66594 11.4245V6.66979C8.66594 6.0133 8.18838 5.48111 7.59928 5.48111ZM2.29849 7.9264H1.23183C0.642724 7.9264 0.165161 8.45099 0.165161 9.0981V11.4415C0.165161 12.0886 0.642724 12.6132 1.23183 12.6132H2.29849C2.8876 12.6132 3.36516 12.0886 3.36516 11.4415V9.0981C3.36516 8.45099 2.8876 7.9264 2.29849 7.9264Z"
                fill="black"
              />
            </svg>

            {/* WiFi */}
            <svg width="17.14" height="12.33" viewBox="0 0 18 13" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.93641 2.80213C11.4235 2.80223 13.8155 3.72432 15.618 5.3778C15.7538 5.50545 15.9707 5.50384 16.1044 5.37419L17.4019 4.11072C17.4696 4.04496 17.5073 3.95588 17.5068 3.8632C17.5062 3.77052 17.4674 3.68187 17.3989 3.61688C12.6679 -0.757833 5.20418 -0.757833 0.473168 3.61688C0.404636 3.68183 0.365752 3.77044 0.36512 3.86313C0.364488 3.95581 0.402161 4.04491 0.469801 4.11072L1.76767 5.37419C1.90126 5.50404 2.11839 5.50565 2.25404 5.3778C4.05678 3.72421 6.44906 2.80212 8.93641 2.80213ZM8.93306 7.0224C10.2904 7.02232 11.5993 7.53406 12.6054 8.45819C12.7415 8.58934 12.9558 8.5865 13.0885 8.45178L14.3758 7.13247C14.4436 7.06327 14.4812 6.96939 14.4802 6.87184C14.4792 6.77429 14.4397 6.68121 14.3706 6.61342C11.3067 3.72257 6.56199 3.72257 3.49816 6.61342C3.42895 6.68121 3.38947 6.77434 3.38856 6.87192C3.38765 6.9695 3.4254 7.06337 3.49333 7.13247L4.78024 8.45178C4.91289 8.5865 5.12726 8.58934 5.26334 8.45819C6.26879 7.53467 7.57664 7.02297 8.93306 7.0224ZM11.4575 9.81596C11.4594 9.9213 11.4223 10.0229 11.355 10.0967L9.17838 12.5514C9.11458 12.6236 9.02758 12.6642 8.93681 12.6642C8.84604 12.6642 8.75905 12.6236 8.69524 12.5514L6.51822 10.0967C6.45096 10.0228 6.41397 9.92122 6.41596 9.81587C6.41796 9.71052 6.45877 9.61075 6.52875 9.54014C7.91885 8.22625 9.95478 8.22625 11.3449 9.54014C11.4148 9.61081 11.4556 9.7106 11.4575 9.81596Z"
                fill="black"
              />
            </svg>

            {/* Battery */}
            <svg width="27.33" height="13" viewBox="0 0 28 13" fill="none">
              <rect
                opacity="0.35"
                x="1.00684"
                y="0.5"
                width="24"
                height="12"
                rx="3.8"
                stroke="black"
              />
              <path
                opacity="0.4"
                d="M26.5068 4.78113V8.8566C27.3116 8.51143 27.8349 7.70847 27.8349 6.81886C27.8349 5.92926 27.3116 5.1263 26.5068 4.78113Z"
                fill="black"
              />
              <rect
                x="2.50684"
                y="2"
                width="21"
                height="9"
                rx="2.5"
                fill="black"
              />
            </svg>
          </div>
        </div>

        {/* Sheet Full Screen */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "38px 38px 0px 0px",
            display: "flex",
            flexDirection: "column",
            gap: "0px",
            alignItems: "center",
            justifyContent: "flex-start",
            alignSelf: "stretch",
            flex: "1",
            position: "relative",
            boxShadow: "0px 15px 75px 0px rgba(0, 0, 0, 0.18)",
          }}
        >
          {/* Toolbar */}
          <div
            style={{
              padding: "0px 0px 10px 0px",
              display: "flex",
              flexDirection: "column",
              gap: "0px",
              alignItems: "center",
              justifyContent: "flex-start",
              alignSelf: "stretch",
              flexShrink: "0",
              position: "relative",
            }}
          >
            {/* Grabber */}
            <div
              style={{
                padding: "5px 0px 0px 0px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                flexShrink: "0",
                height: "16px",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "134px",
                  height: "5px",
                  backgroundColor: "#000000",
                  borderRadius: "100px",
                }}
              ></div>
            </div>
          </div>

          {/* Container */}
          <div
            style={{
              background: "#ffffff",
              display: "flex",
              flexDirection: "column",
              gap: "0px",
              alignItems: "flex-start",
              justifyContent: "space-between",
              alignSelf: "stretch",
              flex: "1",
              position: "relative",
              paddingBottom: "20px",
            }}
          >
            {/* Main Content */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0px",
                alignItems: "center",
                justifyContent: "flex-start",
                alignSelf: "stretch",
                flex: "1",
                position: "relative",
              }}
            >
              {/* Icon */}
              <div
                style={{
                  padding: "16px 0px 16px 0px",
                  display: "flex",
                  flexDirection: "row",
                  gap: "0px",
                  alignItems: "center",
                  justifyContent: "center",
                  alignSelf: "stretch",
                  flexShrink: "0",
                  position: "relative",
                }}
              >
                <svg
                  width="40"
                  height="48"
                  viewBox="0 0 40 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.9531 47.3828C19.7656 47.3828 19.5312 47.3438 19.25 47.2656C18.9688 47.1875 18.6797 47.0703 18.3828 46.9141C15.0547 45.0391 12.2422 43.375 9.94531 41.9219C7.66406 40.4688 5.82812 39.0625 4.4375 37.7031C3.04688 36.3438 2.03906 34.875 1.41406 33.2969C0.789062 31.7188 0.476562 29.8594 0.476562 27.7188V9.78906C0.476562 8.55469 0.734375 7.67188 1.25 7.14062C1.78125 6.59375 2.53906 6.11719 3.52344 5.71094C4.07031 5.47656 4.82812 5.17188 5.79688 4.79688C6.76562 4.42188 7.83594 4.01563 9.00781 3.57812C10.1797 3.14062 11.3438 2.71094 12.5 2.28906C13.6719 1.85156 14.7422 1.46875 15.7109 1.14062C16.6797 0.796875 17.4453 0.546875 18.0078 0.390625C18.3203 0.3125 18.6406 0.234375 18.9688 0.15625C19.2969 0.078125 19.625 0.0390625 19.9531 0.0390625C20.2812 0.0390625 20.6094 0.078125 20.9375 0.15625C21.2812 0.21875 21.6094 0.296875 21.9219 0.390625C22.4688 0.578125 23.2266 0.84375 24.1953 1.1875C25.1641 1.53125 26.2344 1.91406 27.4062 2.33594C28.5781 2.75781 29.7422 3.1875 30.8984 3.625C32.0703 4.04688 33.1406 4.44531 34.1094 4.82031C35.0781 5.17969 35.8359 5.47656 36.3828 5.71094C37.3828 6.13281 38.1406 6.60937 38.6562 7.14062C39.1719 7.67188 39.4297 8.55469 39.4297 9.78906V27.7188C39.4297 29.8594 39.1172 31.7266 38.4922 33.3203C37.8828 34.8984 36.8828 36.3672 35.4922 37.7266C34.1016 39.0859 32.2578 40.4844 29.9609 41.9219C27.6797 43.375 24.8672 45.0391 21.5234 46.9141C21.2266 47.0703 20.9375 47.1875 20.6562 47.2656C20.375 47.3438 20.1406 47.3828 19.9531 47.3828ZM19.9531 43.1406C20.1406 43.1406 20.3438 43.0938 20.5625 43C20.7812 42.9219 21.0625 42.7812 21.4062 42.5781C24.1094 40.9375 26.375 39.5234 28.2031 38.3359C30.0469 37.1484 31.5156 36.0234 32.6094 34.9609C33.7188 33.8984 34.5078 32.7344 34.9766 31.4688C35.4609 30.2031 35.7031 28.6641 35.7031 26.8516V10.5156C35.7031 10.125 35.6484 9.82813 35.5391 9.625C35.4453 9.42187 35.2422 9.26563 34.9297 9.15625C34.1953 8.90625 33.3516 8.61719 32.3984 8.28906C31.4609 7.94531 30.4688 7.58594 29.4219 7.21094C28.3906 6.83594 27.3516 6.46094 26.3047 6.08594C25.2734 5.69531 24.2891 5.32813 23.3516 4.98438C22.4141 4.625 21.5938 4.30469 20.8906 4.02344C20.7031 3.94531 20.5312 3.89062 20.375 3.85938C20.2188 3.82813 20.0781 3.8125 19.9531 3.8125C19.8281 3.8125 19.6875 3.82813 19.5312 3.85938C19.375 3.89062 19.2031 3.94531 19.0156 4.02344C18.3125 4.30469 17.4922 4.61719 16.5547 4.96094C15.6172 5.30469 14.625 5.66406 13.5781 6.03906C12.5312 6.39844 11.4844 6.76562 10.4375 7.14062C9.39062 7.51562 8.39844 7.875 7.46094 8.21875C6.52344 8.5625 5.70312 8.875 5 9.15625C4.67188 9.28125 4.45312 9.44531 4.34375 9.64844C4.25 9.83594 4.20312 10.125 4.20312 10.5156V26.8516C4.20312 28.6641 4.44531 30.2031 4.92969 31.4688C5.41406 32.7344 6.20312 33.9062 7.29688 34.9844C8.39062 36.0469 9.85156 37.1719 11.6797 38.3594C13.5234 39.5312 15.7969 40.9375 18.5 42.5781C18.8438 42.7812 19.125 42.9219 19.3438 43C19.5625 43.0938 19.7656 43.1406 19.9531 43.1406ZM11.4922 31.8203V22.4922C11.4922 20.8828 12.1797 20.0312 13.5547 19.9375V17.1719C13.5547 15.0156 14.1406 13.2734 15.3125 11.9453C16.5 10.6172 18.0469 9.95312 19.9531 9.95312C21.8594 9.95312 23.3984 10.6172 24.5703 11.9453C25.7578 13.2734 26.3516 15.0156 26.3516 17.1719V19.9375C27.7422 20.0312 28.4375 20.8828 28.4375 22.4922V31.8203C28.4375 33.5391 27.6328 34.3984 26.0234 34.3984H13.8828C12.2891 34.3984 11.4922 33.5391 11.4922 31.8203ZM15.9922 19.9141H23.9141V16.9141C23.9141 15.5391 23.5469 14.4297 22.8125 13.5859C22.0938 12.7422 21.1406 12.3203 19.9531 12.3203C18.7656 12.3203 17.8047 12.7422 17.0703 13.5859C16.3516 14.4297 15.9922 15.5391 15.9922 16.9141V19.9141Z"
                    fill="#086B5A"
                  />
                </svg>
              </div>

              {/* Title */}
              <div
                style={{
                  padding: "0px 40px 0px 40px",
                  display: "flex",
                  flexDirection: "row",
                  gap: "0px",
                  alignItems: "center",
                  justifyContent: "center",
                  alignSelf: "stretch",
                  flexShrink: "0",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    color: "#000000",
                    textAlign: "center",
                    fontFamily: "SfPro-Bold, sans-serif",
                    fontSize: "34px",
                    lineHeight: "41px",
                    letterSpacing: "0.4px",
                    fontWeight: "700",
                    position: "relative",
                    flex: "1",
                  }}
                >
                  {screenSettings?.title || "Data Privacy"}
                </div>
              </div>

              {/* Description */}
              <div
                style={{
                  padding: "24px",
                  display: "flex",
                  flexDirection: "row",
                  gap: "0px",
                  alignItems: "center",
                  justifyContent: "center",
                  alignSelf: "stretch",
                  flexShrink: "0",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    color: "#000000",
                    textAlign: "left",
                    fontFamily: "SfPro-Regular, sans-serif",
                    fontSize: "17px",
                    lineHeight: "22px",
                    letterSpacing: "-0.43px",
                    fontWeight: "400",
                    position: "relative",
                    flex: "1",
                    height: "81.47px",
                  }}
                >
                  {screenSettings?.intro_text ||
                    'At Advanta Health, we treat any data that relates to an identified or identifiable individual as "personal data," and only use it within our services.'}
                </div>
              </div>

              {/* Subtitle */}
              <div
                style={{
                  padding: "0px 24px 24px 24px",
                  display: "flex",
                  flexDirection: "row",
                  gap: "0px",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  alignSelf: "stretch",
                  flexShrink: "0",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    color: "#000000",
                    textAlign: "left",
                    fontFamily: "SfPro-Semibold, sans-serif",
                    fontSize: "20px",
                    letterSpacing: "0.0042em",
                    fontWeight: "600",
                    position: "relative",
                    width: "323px",
                  }}
                >
                  {screenSettings?.data_section_title || "Data we capture:"}
                </div>
              </div>

              {/* Data List */}
              <div
                style={{
                  padding: "0px 24px 0px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  alignSelf: "stretch",
                  flexShrink: "0",
                  position: "relative",
                }}
              >
                {/* Lista de datos capturados con iconos SVG verdes */}
                {[
                  {
                    icon: (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M6 8C6 6.89543 6.89543 6 8 6C9.10457 6 10 6.89543 10 8C10 9.10457 9.10457 10 8 10C6.89543 10 6 9.10457 6 8Z"
                          fill="#086B5A"
                        />
                        <path
                          d="M10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12Z"
                          fill="#086B5A"
                        />
                      </svg>
                    ),
                    text: screenSettings?.steps_text || "Steps",
                  },
                  {
                    icon: (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M10 2C8 4 6 6 6 10C6 12.5 7.5 14 10 14C12.5 14 14 12.5 14 10C14 6 12 4 10 2Z"
                          fill="#086B5A"
                        />
                        <path
                          d="M10 6C9 7 8 8 8 10C8 11 8.5 11.5 10 11.5C11.5 11.5 12 11 12 10C12 8 11 7 10 6Z"
                          fill="#FFF"
                        />
                      </svg>
                    ),
                    text: screenSettings?.calories_text || "Calories",
                  },
                  {
                    icon: (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <circle
                          cx="10"
                          cy="10"
                          r="8"
                          stroke="#086B5A"
                          strokeWidth="2"
                          fill="none"
                        />
                        <path
                          d="M10 6V10L13 13"
                          stroke="#086B5A"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    ),
                    text:
                      screenSettings?.active_minutes_text || "Active Minutes",
                  },
                  {
                    icon: (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M4 8H16M4 8L6 6M4 8L6 10"
                          stroke="#086B5A"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16 12H4M16 12L14 10M16 12L14 14"
                          stroke="#086B5A"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ),
                    text: screenSettings?.distance_text || "Distance",
                  },
                  {
                    icon: (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M10 2C7.5 2 5.5 4 5.5 6.5C5.5 9 10 16 10 16C10 16 14.5 9 14.5 6.5C14.5 4 12.5 2 10 2Z"
                          fill="#086B5A"
                        />
                        <circle cx="10" cy="6.5" r="2" fill="#FFF" />
                      </svg>
                    ),
                    text: screenSettings?.location_text || "Location",
                  },
                  {
                    icon: (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <circle cx="10" cy="6" r="3" fill="#086B5A" />
                        <path
                          d="M4 18C4 14 7 12 10 12C13 12 16 14 16 18"
                          stroke="#086B5A"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <rect
                          x="12"
                          y="8"
                          width="4"
                          height="3"
                          rx="1"
                          fill="#086B5A"
                        />
                        <circle cx="14" cy="9.5" r="0.5" fill="#FFF" />
                      </svg>
                    ),
                    text:
                      screenSettings?.workout_photos_text ||
                      "Workout Photos with Location",
                  },
                  {
                    icon: (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <circle cx="10" cy="6" r="3" fill="#086B5A" />
                        <path
                          d="M4 18C4 14 7 12 10 12C13 12 16 14 16 18"
                          stroke="#086B5A"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M6 10L2 8M14 10L18 8"
                          stroke="#086B5A"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <circle cx="2" cy="8" r="1" fill="#086B5A" />
                        <circle cx="18" cy="8" r="1" fill="#086B5A" />
                      </svg>
                    ),
                    text:
                      screenSettings?.training_text || "Training and Exercises",
                  },
                  {
                    icon: (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="14"
                          height="10"
                          rx="2"
                          stroke="#086B5A"
                          strokeWidth="2"
                          fill="none"
                        />
                        <rect
                          x="5"
                          y="2"
                          width="10"
                          height="8"
                          rx="1"
                          fill="#086B5A"
                        />
                        <rect
                          x="7"
                          y="1"
                          width="6"
                          height="6"
                          rx="1"
                          fill="#086B5A"
                        />
                        <circle cx="10" cy="9" r="1" fill="#086B5A" />
                        <path
                          d="M8 12H12M8 15H12"
                          stroke="#086B5A"
                          strokeWidth="1"
                          strokeLinecap="round"
                        />
                      </svg>
                    ),
                    text:
                      screenSettings?.events_text ||
                      "Events from Partner Solutions",
                  },
                  {
                    icon: (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <rect
                          x="6"
                          y="2"
                          width="8"
                          height="16"
                          rx="2"
                          stroke="#086B5A"
                          strokeWidth="2"
                          fill="none"
                        />
                        <rect
                          x="7"
                          y="4"
                          width="6"
                          height="10"
                          rx="1"
                          fill="#086B5A"
                        />
                        <circle cx="10" cy="16" r="1" fill="#086B5A" />
                        <rect x="8" y="5" width="4" height="1" fill="#FFF" />
                      </svg>
                    ),
                    text:
                      screenSettings?.device_metadata_text || "Device Metadata",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    style={{
                      background: "#ffffff",
                      borderRadius: "100px",
                      padding: "0px 16px",
                      display: "flex",
                      flexDirection: "row",
                      gap: "8px",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      width: "100%",
                      height: "48px",
                      minHeight: "48px",
                    }}
                  >
                    {/* Icon */}
                    <div style={{ color: "#086B5A" }}>{item.icon}</div>

                    {/* Text */}
                    <div
                      style={{
                        color: "#000000",
                        textAlign: "left",
                        fontFamily: "SfPro-Regular, sans-serif",
                        fontSize: "17px",
                        lineHeight: "22px",
                        letterSpacing: "-0.43px",
                        fontWeight: "400",
                        flex: "1",
                      }}
                    >
                      {item.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Agreement */}
            <div
              style={{
                padding: "16px 40px 16px 40px",
                display: "flex",
                flexDirection: "column",
                gap: "0px",
                alignItems: "center",
                justifyContent: "flex-start",
                alignSelf: "stretch",
                position: "relative",
              }}
            >
              <div
                style={{
                  textAlign: "left",
                  fontFamily: "SfPro-Regular, sans-serif",
                  fontSize: "16px",
                  letterSpacing: "-0.42px",
                  fontWeight: "400",
                  position: "relative",
                  alignSelf: "stretch",
                  height: "61.1px",
                }}
              >
                <span>
                  <span style={{ color: "#000000" }}>
                    {screenSettings?.legal_text_prefix ||
                      "By continuing, you agree to the"}
                  </span>
                  <span
                    style={{
                      color: "#009161",
                      cursor: eulaLinkNavigation?.target_screen_id
                        ? "pointer"
                        : "default",
                    }}
                    onClick={
                      eulaLinkNavigation?.target_screen_id
                        ? handleEulaClick
                        : undefined
                    }
                  >
                    {screenSettings?.eula_text || "EULA"}
                  </span>
                  <span style={{ color: "#000000" }}>
                    {screenSettings?.legal_text_middle || ". Note: Advanta"}
                  </span>
                  <span
                    style={{
                      color: "#009161",
                      cursor: privacyPolicyNavigation?.target_screen_id
                        ? "pointer"
                        : "default",
                    }}
                    onClick={
                      privacyPolicyNavigation?.target_screen_id
                        ? handlePrivacyPolicyClick
                        : undefined
                    }
                  >
                    {screenSettings?.privacy_policy_text || "Privacy Policy"}
                  </span>
                  <span style={{ color: "#000000" }}>
                    {screenSettings?.legal_text_suffix ||
                      "describes how data is handled in this service."}
                  </span>
                </span>
              </div>
            </div>

            {/* Button Container */}
            <div
              style={{
                padding: "0px 40px 0px 40px",
                display: "flex",
                flexDirection: "column",
                gap: "0px",
                alignItems: "center",
                justifyContent: "flex-start",
                alignSelf: "stretch",
                flexShrink: "0",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "0px",
                  alignItems: "center",
                  justifyContent: "center",
                  alignSelf: "stretch",
                  flexShrink: "0",
                  position: "relative",
                }}
              >
                <button
                  onClick={handleAcceptClick}
                  style={{
                    borderRadius: "1000px",
                    padding: "6px 20px 6px 20px",
                    display: "flex",
                    flexDirection: "row",
                    gap: "4px",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: "0",
                    position: "relative",
                    background: "#086b5a",
                    border: "none",
                    cursor: acceptButtonNavigation?.target_screen_id
                      ? "pointer"
                      : "default",
                    boxShadow:
                      "0px 1px 8px 0px rgba(0, 0, 0, 0.12), 0px 0px 2px 0px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div
                    style={{
                      borderRadius: "100px",
                      display: "flex",
                      flexDirection: "row",
                      gap: "0px",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: "0",
                      height: "36px",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        color: "#ffffff",
                        textAlign: "center",
                        fontFamily: "SfPro-Medium, sans-serif",
                        fontSize: "17px",
                        fontWeight: "500",
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {screenSettings?.accept_button_text ||
                        "Accept & Continue"}
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* App Bottom Bar */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0px",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                alignSelf: "stretch",
                flexShrink: "0",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0px",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  alignSelf: "stretch",
                  flexShrink: "0",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    flexShrink: "0",
                    width: "390px",
                    height: "34px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      background: "#000000",
                      borderRadius: "100px",
                      width: "134px",
                      height: "5px",
                      position: "absolute",
                      left: "50%",
                      transform: "translateX(-50%)",
                      bottom: "8px",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataPrivacyScreen;
