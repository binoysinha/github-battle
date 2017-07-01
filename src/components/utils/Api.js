const id = "YOUR_CLIENT_ID";
const sec = "YOUR_SECRET_ID";
const params = "?client_id=" + id + "&client_secret=" + sec;

function getProfile(username) {
    return fetch(`https://api.github.com/users/${username}`)
        .then(response => response.json());
}

function getRepos(username) {
    return fetch('https://api.github.com/users/' + username + '/repos' + params + '&per_page=100')
        .then(response => response.json());
}

function getStarCount(repos) {
    return repos.reduce((count, repo) => {
        return count + repo.stargazers_count
    }, 0);
}

function calculateScore(profile, repos) {
    let followers = profile.followers;
    let totalStars = getStarCount(repos);
    return (followers * 3) + totalStars;
}

function handleError(error) {
    console.warn(error);
    return null;
}

async function getUserData(player) {
    let profile = await getProfile(player);
    let repos = await getRepos(player);
    return {
        profile: profile,
        score: calculateScore(profile, repos)
    }
}

function sortPlayers(...players) {
    return players.sort(function (a, b) {
        return b.score - a.score;
    });
}

const api = {
    battle: async(...player) => {
        let player1 = await getUserData(player[0]);
        let player2 = await getUserData(player[1]);
        return sortPlayers(player1, player2);

    },
    fetchPopularRepos: async(language) => {
        try {
            let encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + language + '&sort=stars&order=desc&type=Repositories');
            let response = await fetch(encodedURI);
            return response.json();
        } catch (e) {
            console.log(e.message)
        }
    },
    fetchUserName: async(username) => {
        return await getProfile(username);
    }
}

export default api;