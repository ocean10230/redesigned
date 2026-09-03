declare type GithubRepositoriesResponse = {
    "id": number, "name": string, "full_name": `${string}/${string}`, "private": boolean,
    "owner": {
        "login": string,
        "avatar_url": string
    },
    "description": string,
    "fork": boolean
    "homepage": null,
    "size": 382,
    "language": string,
    "has_issues": true,
    "has_discussions": number,
    "forks_count": number,
    "mirror_url": string | null,
    "archived": boolean,
    "disabled": boolean,
    "open_issues_count": number,
    "license": {
        "name": string,
        "url": string,
    },
    "allow_forking": boolean,
    "visibility": "public" | "private",
    "forks": number,
    "open_issues": number,
    "watchers": number,
    "default_branch": string,
    "stargazers_count": number,
}