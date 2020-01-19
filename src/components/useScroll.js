import {useEffect} from 'react'
import resetScroll from '../utils/resetScroll'

export default function useScroll(pathname) {
    useEffect(resetScroll, [pathname]);
}
