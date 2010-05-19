/*
 * modules_list.js
 */
////////////////////////////////////////////////////////////////////////////////
 /** Modules that need to be initialized and register their page handlers
 * in the beginning.
 * Each should implement an init() method, which will be called only once.
 * Register your page handlers in it.
 */
 
if (!Foxtrick) var Foxtrick={};
 
Foxtrick.modules = [
                    Foxtrick.XMLData,
					
					FoxtrickReadHtPrefsFromHeader,
					Foxtrick.Matches,
					FoxtrickForumStripHattrickLinks,
					FoxtrickForumChangePosts,
                    FoxtrickShowForumPrefButton,
                    FoxtrickMovePlayerSelectbox,  // keep before others on playerdetails page
                    FoxtrickAddManagerButtons,   // keep before FoxtrickAddDefaultFaceCard
                    FoxtrickMovePlayerStatement,
					FoxtrickFixcssProblems,
					FoxtrickSimplePresentation,
					FoxtrickForumPresentation,
                    FoxtrickForumTemplates,
                    FoxtrickForumPreview,
                    FoxtrickForumYouthIcons,
                    Foxtrick.BookmarkAdjust,
                    FoxtrickAddDefaultFaceCard,
                    FoxtrickMoveLinks,   // keep before FoxtrickHideManagerAvatarUserInfo
                    //FoxtrickAlltidFlags,  // keep before FoxtrickHideManagerAvatarUserInfo
                    FoxtrickForumAlterHeaderLine,
                    FoxtrickTeamPopupLinks,
                    FoxtrickTeamPopupLinksMore,
                    FoxtrickHideManagerAvatarUserInfo,
                    FoxtrickGoToPostBox,
                    FoxtrickContextMenuCopyId,
                    FoxtrickHeadercopyicons,
					FoxtrickCopyTrainingReport,
                    FoxtrickCopyScoutReport,
                    FoxtrickCopyPlayerSource,
                    FoxtrickFormatPostingText,
                    FoxtrickCopyPostID,
                    FoxtrickStaffMarker,
                    FoxtrickHTThreadMarker,
                    FoxtrickMedianTransferPrice,
                    FoxtrickYouthSkillNotes,
                    FoxtrickAddLeaveConfButton,
                    FoxtrickStarsCounter,
                    FoxtrickFlagCollectionToMap,
                    FoxtrickTransferListSearchFilters,
                    FoxtrickTransferListDeadline,
                    FoxtrickExtendedPlayerDetails,
                    FoxtrickLastLogin,
                    FoxtrickExtendedPlayerDetailsWage,
                    FoxtrickHTDateFormat,
                    FoxtrickMatchReportFormat,
                    FoxtrickMatchPlayerColouring,
                    Foxtrick.AttVsDef, // AttVsDef should be placed before Ratings
                    Foxtrick.Ratings,
                    Foxtrick.htmsStatistics, // htmsStatistics should be placed after Ratings
                    FoxtrickSkillTable,
                    Foxtrick.TeamStats,  // before FoxtrickLinksPlayers
                    FoxtrickAlert,
                    FoxtrickAlertCustomOff,
                    FoxtrickAlertCustomSounds,
                    FoxtrickOriginalFace,
                    FoxtrickBackgroundFixed,
                    FoxtrickPlayerAdToClipboard,
                    FoxtrickCopyRatingsToClipboard,
                    FoxtrickLinksCustom,
                    FoxtrickLinksLeague,
                    FoxtrickLinksCountry,
                    FoxtrickLinksTeam,
                    FoxtrickLinksChallenges,
                    FoxtrickLinksEconomy,
                    FoxtrickLinksYouthOverview,
                    FoxtrickLinksYouthTraining,  
                    FoxtrickLinksYouthPlayerDetail, 
                    FoxtrickLinksArena,
                    FoxtrickLinksCoach,
                    FoxtrickLinksPlayerDetail,
                    FoxtrickLinksMatch,
                    FoxtrickLinksTraining,
                    FoxtrickLinksAlliances,
                    FoxtrickLinksNational,
                    FoxtrickLinksManager,
                    FoxtrickLinksAchievements,
                    FoxtrickLinksPlayers,
                    FoxtrickLinksFans,
                    FoxtrickLinksStaff,
                    FoxtrickLinksTracker,
					FoxtrickLinksClubTransfers,
                    FoxtrickConfirmActions,
                    FoxtrickEconomyDifference,
                    FoxtrickHideSignatures,
					FoxtrickMarkUnread,
                    FoxtrickForumNextAndPrevious,
                    FoxtrickForumLastPost,
                    FoxtrickPersonalityImages,
                    FoxtrickSkillColoring,
                    FoxtrickSkinPlugin,
                    FoxtrickMatchIncome,
                    FoxtrickHelper,
                    FoxtrickLargeFlags,
                    FoxtrickTeamSelectBox,
                    FoxtrickSeniorTeamShortCuts,
                    FoxtrickExtraShortcuts,
                    FoxtrickCustomMedals,
                    FoxtrickForumRedirManagerToTeam,
                    FoxtrickRedirections,
                    FoxtrickCurrencyConverter,
                    FoxtrickTickerColoring,
                    FoxtrickSeasonStats,   // keep before FoxtrickCopyMatchID
                    FoxtrickHistoryStats,   // keep before FoxtrickCopyMatchID
                    FoxtrickCopyMatchID,
                    FoxtrickHeaderFix,
                    FoxtrickHeaderFixLeft,
                    FoxtrickNewMail,
                    FoxtrickPlayerBirthday,
                    //FoxtrickAddHtLiveToOngoing, // obsolete
                    FoxtrickReadHtPrefs,
                    FoxtrickMyHT,
                    FoxtrickPrefsDialogHTML,
                    FoxtrickLeagueNewsFilter,
                    FoxtrickShortPAs,
                    FoxtrickCopyPosting,
                    FoxtrickMoveManagerOnline,
                    // FoxtrickForumSearch,  // new not finished
                    FoxtrickTables,
                    FoxtrickMatchTables,
                    FoxtrickCrossTable,
                    FoxtrickYouthSkillHideUnknown,
                    FoxtrickHighlightCupwins,
                    FoxtrickElectionTable,
                    FoxtrickSkillTranslation,
                    FoxtrickOnPagePrefs,
                    FoxtrickLineupShortcut,
                    //FoxtrickSingleline2,
                    FoxtrickYouthPromotes,
                    FoxtrickCountyList,
                    FoxtrickMatchOrderColoring,
                    FoxTrickPredefinedChallenges,
                    FoxtrickSmallerPages, // new not finished //after FoxtrickTransferListDeadline and probably also after all other player detail adjustment, so keep it in the end
                    FoxtrickHighlightBotTeams,
					FoxtrickTransferCompareSort,
					//FoxtrickTransferSearchResultsSort, //not finished
					FoxtrickLeagueAndMatchChat,
					FoxtrickRapidId,
					FoxtrickForumStage,
					FoxtrickExtraPlayerInfo,
					FoxtrickPlayerFilters
];
