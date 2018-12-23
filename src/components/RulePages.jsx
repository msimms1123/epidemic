import React from 'react'

const RulePages = ({pagenum}) => {
    let pg1 = (
        <article>
            <h2>Object of the Game</h2>

<p>Pandemic is a cooperative game. You and your fellow players are members of a disease control team, working together to research cures and prevent additional outbreaks.</p>

<p>Each of you will assume a unique role within the team, with special abilities that will improve your team's chances if applied wisely. e object is to save humanity by discovering cures to four deadly diseases (Blue, Yellow, Black, and Red) that threaten to overtake the planet.</p>

<p>If you and your team aren't able to keep the diseases contained before finding the necessary cures, the planet will be overrun and the game will end in defeat for everyone... Do you have what it takes to save humanity?</p>


<h2>Game Play</h2>

<p>Play proceeds clockwise around the table with each player taking turns in order until the game ends.</p>

<p> Each turn, the current player must:</p>
<ul>
<li>Take 4 actions</li>
<li>Draw 2 cards to add to his hand</li>
<li>Take on the role of the Infector </li>
</ul>

<p>After taking the role of the Infector, the player's turn is over and the player on his left then begins his turn.</p>

        </article>
    )
    let pg2 = (
        <article>
            <h2>Actions</h2>

<p>A player gets 4 actions to spend on her turn. A player may select from any of the available Basic and Special actions and spend 1 action to perform it. A given action may be performed more than once during a turn, so long as 1 action is spent for each instance.</p>

<p>Each player's Role will grant them special abilities that are unique to that player. Players may also pass if they have nothing else to do. Unused actions may not be saved from turn to turn.</p>



        </article>
    )
    let pg3 = (
        <article>
            <h3>Basic Actions</h3>

<h4>Drive (or Ferry)</h4>

<p>Move your pawn to an adjacent city. Cities are adjacent if they are connected by a red line. Red lines that go off the edge of the board "wrap around" to the opposite board edge and continue to the indicated city. (For example, Sydney and Los Angeles are considered to be adjacent)</p>

<h4>Direct Flight</h4>

<p>Play a card from your hand and move your pawn to the pictured city. Discard the card to the Player Discard pile.</p>

<h4>Charter Flight</h4>

<p>Play the card corresponding to your pawn's current location, and move to any city on the board. Discard the card to the Player Discard pile.</p>

<h4>Shuttle Flight</h4>

<p>If your pawn is in a city with a Research Station, move it to any other city with a Research Station. (See below for details on building Research Stations).</p>

<h4>Pass</h4>

<p>A player may also elect to pass (and do nothing) for an action.</p>

<p>The Dispatcher may move other player's pawns on his turn (using any of the available Basic actions) as if they were his own pawn. He may also spend an action to move a pawn to any city that contains another pawn. He may only move other players' pawns if they permit him to do so.</p>

<p><b>Note:</b> For the Charter Flight action, the Dispatcher must play the card corresponding to the current location of the pawn he wishes to move.</p>

        </article>
    )
    let pg4 = (
        <article>
            <h3>Special Actions</h3>


<h4>Build A Research Station</h4>

<p>Building Research Stations helps your team move from place to place. Research Stations are also required for discovering cures.</p>

<p>Play the card corresponding to the city your pawn currently occupies, then place a Research Station in that city. Discard the card to the Player Discard Pile. If there aren't any Research Stations left in the supply, select one of the Research Stations already in play and transfer it to the city your pawn occupies.</p>

<p>Thee Operations Expert does not have to play the card matching the city his pawn occupies when performing the Build A Research Station action. He simply spends an action to add a Research Station to his current city.</p>

<h4>Discover A Cure</h4>

<p>Once your team has discovered all four cures, you win!</p>

<p>If your pawn is in a city with a Research Station, discard 5 cards of the same color to cure the corresponding disease. Take a Cure marker and place it (vial-side up) on the Discovered Cures area of the board to indicate which disease has been cured. Place the spent cards into the Player Discard Pile.</p>

<p>The Scientist only needs 4 cards of a color to discover the cure of the corresponding disease when performing the Discover Cure action.</p>

<h4>Treat Disease</h4>

<p>Over the course of the game, your team can treat diseases to buy the time needed to discover cures.</p>

<p>Remove a disease cube from the city your pawn occupies. (Each removed cube costs one action). Place the removed cube back into the stock by the side of the board. If players have discovered a cure, instead of one cube, remove all cubes of a cured disease in your current city for one action.</p>

<h4>Eradicating A Disease</h4>

<p>If a cure for a given disease has been discovered and all of the disease cubes of that color have been removed from the board, flip the Cure marker for the disease to the "Sunset" side. From now on, cards of this color have no effect when drawn on the Infector's turn. Take all of the cubes of the eradicated color and place them back in the box-they will not be used again for the rest of the game.</p>

<p>The Medic may remove all the cubes of a single color (instead of 1) when performing the Treat Disease action. Also, if the Medic at any time finds herself in a city that contains cubes of a disease that has been cured, she may immediately remove all of those cubes. This unique ability is in effect during all players' turns and does not cost any actions to perform.</p>

<h4>Share Knowledge</h4>

<p>Sometimes it's hard for one player to get the cards necessary to discover a cure. The Share Knowledge action (while difficult to perform) can be useful in these cases.</p>

<p>Transfer a card from one player to another. Every card transferred costs 1 action. Both your pawn and your fellow player's pawn must be in the same city, and you may only transfer the card of the city that you are in together. (For example, if you are together in Moscow, only the Moscow card may be transferred from one player to the other).</p>

<p>If either player holds more than 7 cards as the result of a transfer, the excess cards must be immediately discarded to the Player Discard Pile.</p>

<p>The Researcher may give a fellow player any card from his hand when involved in a Share Knowledge action. He is not restricted to giving the card of the current jointly-occupied city, like other players are.</p>

<p>This freedom only applies when the Researcher is giving a card-he always receives a card with the same restriction as other players. The Researcher can utilize this ability when involved in Share Knowledge actions on any player's turn.</p>
        </article>
    )
    let pg5 = (
        <article>
            <h2>Drawing Cards</h2>

<p>After taking actions, players must draw 2 cards from the Player Draw Pile to add to their hand. If a card is an Epidemic card, instead of taking the card in hand, refer to the rules for Epidemics, below. After drawing the required cards, take on the role of the Infector.</p>

<p>If there aren't enough cards in the Player Draw Pile to draw, the game immediately ends in defeat for all players!</p>

<h3>Special Event Cards</h3>

<p>The Player Cards deck contains some Special Event cards. These cards may be played at any time (even on a fellow player's turn) and do not require an action to play.</p>

<p>When you play a Special Event card, immediately follow the instructions on the card, then discard the card into the Player Discard Pile.</p>

<h3>Hand Limit</h3>

<p>Players have a hand limit of 7 cards. If the number of cards in hand ever exceeds 7 as a result of drawing cards (or performing the Share Knowledge action), the player must immediately discard cards in excess to the Player Discard Pile.</p>

<p>Players may choose which cards to discard. Players may play Special Event cards (including any they have just drawn) instead of discarding them, to help reduce their hand to 7.</p>

<h3>Sharing Information About Cards</h3>

<p>Players may openly discuss strategies during the game, but like the real world, the players do not immediately know everything that the other players do. To simulate this, if you are playing the Normal or Heroic Games, players may not show the contents of their hands to their fellow players during the game.</p>

<p>Players may however, freely tell each other what cards they have. The Introductory Game has no such restriction and players may decide to play their hands openly.</p>

<p>Because Pandemic is a test of cooperation and mettle (and not of memory), players may freely examine the contents of the Player Discard Pile and the Infection Discard Pile at any time.</p>
        </article>
    )

    let pg6 = (
        <article>
            <h3>Epidemics</h3>

<p>Whenever a player draws an Epidemic card, discard the card into the Player Discard Pile and do the following:</p>

<ol>
<li> <p><b>Increase the Infection Rate:</b> Move the Infection Rate Indicator up by one on the Infection Rate Track on the board</p>

</li>
<li> <p><b>Infect:</b> Take the bottom card from the Infection Draw Pile and add 3 cubes to the city pictured on the card, then place the card into the Infection Discard Pile. Note: No city can contain more than 3 cubes of any one color. If the Epidemic would cause the city to exceed that limit, any excess cubes are returned to the stock and an outbreak is triggered.</p>

<p>If there are not enough cubes to add to the board during an Epidemic, the game immediately ends in defeat for all players.</p>

</li>
<li> <p><b>Increase the intensity of infection:</b> Take the Infection Discard Pile, thoroughly shuffle it, then place it on top of the remaining Infection Draw Pile.</p>

<p>(Don't shuffle these cards into the Infection Draw Pile).</p>

</li>
</ol>
        </article>
    )
let pg7 = (
    <article>
        <h2>Playing The Infector</h2>

<p>Draw cards from the Infection Draw Pile equal to the current Infection Rate and add one cube to the pictured cities, using a cube of the same color as each card. Resolve the cards in the order you draw them.</p>

<p>If, however, the pictured city is of a color that has been eradicated, do not add a cube. If a city already has 3 cubes in it of the color being added, instead of adding a cube to the city, an outbreak occurs in that color.</p>

<h3>Outbreaks</h3>

<p>An outbreak occurs if a player is required to add a cube to a city that already has 3 cubes in it of that color. When this happens, instead of adding a 4th cube, add a cube of the outbreaking color to each adjacent city.</p>

<h3>Chain Reactions</h3>

<p>If any of these new cubes would cause the total number of cubes of that color in an adjacent city to exceed 3, additional outbreaks may occur, causing a chain reaction. Note that each city may only outbreak once in each chain reaction</p>

<p>Each time a city outbreaks, move the Outbreaks Marker up one space on the Outbreak Indicator. If the number of outbreaks ever reaches 8 (and the Outbreaks Marker reaches the skull symbol), the game immediately ends in defeat for all players.</p>

<p>Also, if there are not enough cubes to add to the board when infecting, the game immediately ends in defeat for all players.</p>

<h3>Turn End</h3>

<p>After all of the Infection Cards are resolved, place them into the Infection Discard Pile. Your turn is over. e player to the left now begins his turn.</p>

    </article>
)
let pg8 = (
    <article>
        <h2>End of the Game</h2>

<h3>Defeat</h3>

<p>The game ends immediately in defeat for all players if any of the following conditions occur:</p>
<ul>
<li>A player needs to add disease cubes to the board and there aren't any left of that color in the supply.</li>
<li>The eighth outbreak occurs (the Outbreaks Marker reaches the skull symbol on the Outbreak Indicator).</li>
<li>There are not enough cards in the Player Draw Pile when a player must draw cards.</li>
</ul>

<h3>Victory</h3>

<p>Players collectively win the game immediately when the cures for all four diseases (Blue, Yellow, Black, and Red) have been discovered. Players do not need to administer cures to every infected city in order to win the game-victory is instant when any player discovers the fourth and final cure.</p>

    </article>
)
    let pages = [pg1,pg2,pg3,pg4,pg5,pg6,pg7,pg8];
    return pages[pagenum];
}

export default RulePages;