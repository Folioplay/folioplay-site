<div className={"tournament-info-container "}>
{tournament.status !== 3 ? (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1, y: -90 }}
    transition={{ duration: 0.3 }}
    className="tournament-view-card"
  >
    <div className="tournament-view-info">
      <span style={{ textAlign: "left" }}>
        <span
          className="font-size-12 font-weight-500"
          style={{ color: "var(--grey-shade)" }}
        >
          Prize Pool
        </span>
        <br />
        <span className="font-size-20 font-weight-500">
          {/* {tournament.total_reward} MGT */}
          {tournament.rewards.prize_pool} FPC
        </span>
      </span>
      <span className="ml-auto" style={{ textAlign: "right" }}>
        <span
          className="font-size-12 font-weight-500"
          style={{ color: "var(--grey-shade)" }}
        >
          Entry Fee
        </span>
        <br />
        {!disabledTournament &&
        
        <Button
          className={disabledClass + " tournament-fee"}
          size="small"
          style={
            disabledTournament
              ? {}
              : { backgroundColor: "var(--golden)" }
          }
          onClick={() => {
            chooseTeamOpen();
          }}
          disabled={disabledTournament}
        >
         JOIN&nbsp;@{tournament.entryFee} FPC
        </Button> }

        {disabledTournament &&
        
        <Button
          className={disabledClass + " tournament-fee"}
          size="small"
          style={
            disabledTournament
              ? {}
              : { backgroundColor: "var(--golden)" }
          }
          onClick={() => {
            chooseTeamOpen();
          }}
          disabled={disabledTournament}
        >
          {tournament.entryFee} FPC
        </Button> }
      </span>
    </div>
    <div>
      <LinearProgress
        variant="determinate"
        style={{ backgroundColor: "var(--dim-white)" }}
        value={seatsFilled}
      />
      <div className="spots-wrapper">
        <span
          className="font-size-12 font-weight-500 mt-5"
          style={{ color: "var(--golden)" }}
        >
          <span id={tournament.id + "-left-spots"}>
            {tournament.total_spots - tournament.filled_spots}
          </span>{" "}
          spots left
        </span>
        <span
          className="font-size-12 font-weight-500 mt-5"
          style={{ color: "var(--dark-dim-white)" }}
        >
          {tournament.total_spots} spots
        </span>
      </div>
    </div>
    <div
      className="tournamentPage__countdown"
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <span
        id="timeRemaining"
        className="font-size-12"
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          transform: "translateY(-10px)",
        }}
      >
        {startTime > Date.now() ? (
          <Countdown
            date={startTime -300000 }
            renderer={renderer}
          />
        ) : (
          <>
            {endTime > Date.now() ? (
              <Countdown
                date={endTime}
                renderer={rendererEnd}
              />
            ) : null}
          </>
        )}
      </span>
      {/* const startDate = new Date(tournament.start_time); */}
    </div>
  </motion.div>
) : (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1, y: -90 }}
    transition={{ duration: 0.3 }}
    className={
      tournament.status === 0
        ? "tournament-view-card-completed"
        : "tournament-view-card-completed-red"
    }
  >
    {amountWon !== -1 ? (
      <>
        <div className="profileHeaderTP">
          <div className="profilePicture">
            <img
              src={userImg}
              alt="profilePic"
              height="64px"
              width=" 64px"
              className="profilepic__image"
            />
          </div>

          <div className="userDetails">
            <div className="userNameTP">
              {localStorage.getItem("folioUsername")}
            </div>
            <div className="tview__rewardDisplay">
              <span>You won {amountWon} FPC</span>
            </div>
          </div>
        </div>
        <img
          className="winner-cups-img"
          src={require("../../../images/cups-winner.png").default}
          width="200px"
          style={{ transform: "translate(115%,-5%)" }}
        />
      </>
    ) : (
      <div className="profileHeaderNP">
        <img
          className="winner-cups-img"
          src={require("../../../images/cups-winner.png").default}
          width="200px"
        />
        {winnersRedux.length > 0 && (
          <span className="winner-span font-weight-500" style={{}}>
            <b>{winnersRedux[0].user.username}</b>&nbsp; won &nbsp;
            <b>{winnersRedux[0].amount_won} FPC</b>&nbsp; in this
            tournament
          </span>
        )}
        <span
          className="font-size-12"
          style={{ letterSpacing: "0.5px" }}
        >
          You didn't participated in this tournament.
        </span>
        <span
          className="font-size-12 join-tourna-span"
          onClick={() => {
            navigate("/tournaments");
          }}
        >
          Join new tournaments
        </span>
      </div>
    )}
  </motion.div>
)}

<div className="folioplay-tabs">
  <LeaderBoardTabs
    tournamentId={tournament.id}
    tournamentStatus={tournament.status}
    tournamentPrizes={tournament.rewards.distribution}
    rewardSize={tournament.rewards.places_paid}
  />
</div>
<JoinTournamentDrawer
  teams={teams}
  tournamentId={tournament.id}
  tournaments={[]}
  setErrorMessage={setErrorMessage}
  setErrorMessageSnackOpen={setErrorMessageSnackOpen}
  navigate={navigate}
  changeTournament={true}
/>
</div>
