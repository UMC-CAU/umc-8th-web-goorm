import { useParams } from "react-router-dom";
import {useEffect, useState} from 'react';
import axios from 'axios';
import { Cast, CreditResponse, MovieDetail } from "../types/movie";
import { LoadingSpinner } from "../components/LoadingSpinner";

const MovieDetailPage=()=>{
    const {movieId}=useParams<{movieId:string}>();

    const [movie,setMovie]=useState<MovieDetail|null>(null);
    const [credits, setCredits] = useState<CreditResponse | null>(null);
    const [isPending, setIsPending] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(()=>{
        const fetchDetail=async ()=>{
            try {
                setIsPending(true);
                const [movieRes, creditRes]=await Promise.all([
                    axios.get<MovieDetail>(`https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,{
                        headers:{
                            Authorization:`Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                        },
                    }),
                    axios.get<CreditResponse>(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,{
                        headers:{
                            Authorization:`Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                        },
                    }),
                ]);

                setMovie(movieRes.data);
                setCredits(creditRes.data);
            } catch (err){
                setIsError(true);
            } finally{
                setIsPending(false);
            }
        };

        fetchDetail();
    }, [movieId]);
    if (isPending){
        return (
            <div className="flex justify-center items-center h-screen">
                <LoadingSpinner />
            </div>
        );
    }

    if (isError || !movie || !credits) {
        return (
          <div className="text-center text-red-500 text-2xl mt-10">
            상세 정보를 불러오는 데 실패했습니다.
          </div>
        );
      }

    const directors=credits.crew.filter((person)=>person.job==='Director');

    return (
        <div className="p-6 text-white">
            <div
            className="bg-cover bg-center h-96 rounded-xl"
            style={{
                backgroundImage:`url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            }}
            ></div>

            <div className="mt-6">
                <h1 className="text-4xl font-bold">{movie.title}</h1>
                <p className="text-gray-400 mt-2">
                    평균 ★ {movie.vote_average}/{movie.release_date}/{movie.runtime}분
                </p>
                <p className="mt-4 text-lg leading-relaxed">{movie.overview}</p>
            </div>

            <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-4">감독/출연</h2>
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-4">
                    {directors.map((person)=>(
                        <div key={person.id} className="text-center bg-[#1f1f1f] rounded-xl p-4">
                            <img
                            src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                            className="w-24 h-24 rounded-full object-cover mx-auto"
                            />
                            <p className="mt-2">{person.name}</p>
                            <p className="text-sm text-gray-400">{person.job}</p>
                        </div>
                    ))}
                    {credits.cast.slice(0,12).map((person: Cast)=>(
                        <div key={person.id} className="text-center bg-[#1f1f1f] rounded-xl p-4">
                            <img
                            src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                            className="w-24 h-24 rounded-full object-cover mx-auto"
                            />
                            <p className="mt-2 text-base font-semibold text-white drop-shadow-md">{person.name}</p>
                            <p className="text-sm text-[#dddddd]">{person.character}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieDetailPage;