export type Movie={
    adult:boolean;
    backdrop_path: "/2Nti3gYAX513wvhp8IiLL6ZDyOm.jpg";
genre_ids: number[];
id: number;
original_language: string;
original_title: string;
overview: string;
popularity: number;
poster_path: string;
release_date: string;
title: string;
video: boolean;
vote_average: number;
vote_count: number;
};

export type MovieResponse={
    page:number;
    results:Movie[];
    total_pages:number;
    total_results:number;
};

export type MovieDetail={
    id:number;
    title:string;
    overview:string;
    backdrop_path:string;
    poster_path:string;
    release_date:string;
    runtime:number;
    vote_average:number;
};

export type Cast={
    id:number;
    name:string;
    character:string;
    profile_path:string;
};

export type Crew={
    id:number;
    name:string;
    job:string;
    profile_path:string;
};

export type CreditResponse={
    cast:Cast[];
    crew:Crew[];
};