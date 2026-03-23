"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Flame, TrendingUp, TrendingDown, Maximize2, Minimize2 } from "lucide-react";
import { 
  createChart, 
  ColorType, 
  CrosshairMode, 
  LineStyle, 
  ISeriesApi, 
  UTCTimestamp,
  IChartApi,
  CandlestickData,
  HistogramData
} from "lightweight-charts";

interface MovieTokenChartProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MovieTokenChart({ isOpen, onClose }: MovieTokenChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<"Histogram"> | null>(null);
  
  const drawerRef = useRef<HTMLDivElement>(null);
  const [currentPrice, setCurrentPrice] = useState(1.89);
  const [priceChange, setPriceChange] = useState(2.4);
  const [burnDetails, setBurnDetails] = useState<{ visible: boolean; x: number; y: number; text: string } | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Initialize Chart
  useEffect(() => {
    if (!isOpen || !chartContainerRef.current) return;

    const handleResize = () => {
      if (chartInstance.current && chartContainerRef.current) {
        chartInstance.current.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: 'rgba(255, 255, 255, 0.6)',
        fontFamily: "'Figtree', sans-serif"
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          color: '#1863E1',
          style: LineStyle.Dotted,
          width: 1,
          labelBackgroundColor: '#1863E1',
        },
        horzLine: {
          color: '#1863E1',
          style: LineStyle.Dotted,
          width: 1,
          labelBackgroundColor: '#1863E1',
        },
      },
      timeScale: {
        borderColor: 'rgba(255, 255, 255, 0.1)',
        rightOffset: 5,
        timeVisible: true,
      },
      rightPriceScale: {
        borderColor: 'rgba(255, 255, 255, 0.1)',
      },
    });
    
    chartInstance.current = chart;

    // Candlestick
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#1863E1',
      downColor: '#E11818',
      borderVisible: false,
      wickUpColor: '#1863E1',
      wickDownColor: '#E11818',
    });
    candlestickSeriesRef.current = candlestickSeries;

    // Volume
    const volumeSeries = chart.addHistogramSeries({
      color: 'rgba(24, 99, 225, 0.3)',
      priceFormat: { type: 'volume' },
      priceScaleId: '', // set as an overlay
    });
    volumeSeries.priceScale().applyOptions({
      scaleMargins: { top: 0.8, bottom: 0 },
    });
    volumeSeriesRef.current = volumeSeries;

    // Dummy Data Generation
    const baseDate = new Date();
    baseDate.setHours(0, 0, 0, 0);
    const initialData: CandlestickData[] = [];
    const volumeData: HistogramData[] = [];
    let startPrice = 1.6;

    for (let i = 60; i > 0; i--) {
        const time = (baseDate.getTime() / 1000 - i * 3600) as UTCTimestamp;
        const open = startPrice;
        const close = open + (Math.random() - 0.45) * 0.1;
        const high = Math.max(open, close) + Math.random() * 0.05;
        const low = Math.min(open, close) - Math.random() * 0.05;
        
        initialData.push({ time, open, high, low, close });
        volumeData.push({ 
            time, 
            value: Math.random() * 10000 + 1000, 
            color: close > open ? 'rgba(24, 99, 225, 0.3)' : 'rgba(225, 24, 24, 0.3)' 
        });
        
        startPrice = close;
    }

    // Set Data with staggered animation effect natively
    candlestickSeries.setData(initialData);
    volumeSeries.setData(volumeData);
    chart.timeScale().fitContent();

    // Burn Marker on the 10th last candle
    const burnTime = initialData[initialData.length - 10].time;
    candlestickSeries.setMarkers([
      {
        time: burnTime,
        position: 'aboveBar',
        color: '#ff4444',
        shape: 'arrowDown',
        text: '🔥 BURN',
      },
    ]);

    // Click handler for Burn Event
    chart.subscribeClick((param) => {
      // Find exact coordinate of the click to show tooltip
      // In lightweight charts, there's no native "marker click", we approximate using param.time
      if (param.point && param.time === burnTime) {
         setBurnDetails({
            visible: true,
            x: param.point.x,
            y: param.point.y,
            text: '1.5M $THAAI removed from liquidity permanently at $1.82.'
         });
      } else {
         setBurnDetails(null);
      }
    });

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [isOpen]);

  // Native Fullscreen toggle
  const toggleFullScreen = () => {
    const el = drawerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen().catch((err) => {
        console.warn(`Fullscreen error: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Sync state with browser fullscreen events (handles Esc key, external exit)
  useEffect(() => {
    const onFSChange = () => {
      const isNowFS = !!document.fullscreenElement;
      setIsFullScreen(isNowFS);
      // Force chart resize to fill the new dimensions
      if (chartInstance.current && chartContainerRef.current) {
        const container = chartContainerRef.current;
        setTimeout(() => {
          if (chartInstance.current) {
            chartInstance.current.applyOptions({
              width: container.clientWidth,
              height: container.clientHeight,
            });
            chartInstance.current.timeScale().fitContent();
          }
        }, 100); // slight delay for DOM to settle after FS transition
      }
    };
    document.addEventListener('fullscreenchange', onFSChange);
    return () => document.removeEventListener('fullscreenchange', onFSChange);
  }, []);

  // Simulate Real-time "Heartbeat" every 3 secs
  useEffect(() => {
    if (!isOpen || !candlestickSeriesRef.current || !volumeSeriesRef.current || !chartInstance.current) return;

    let currentRefPrice = currentPrice;
    const interval = setInterval(() => {
      const time = (Date.now() / 1000) as UTCTimestamp;
      const fluctuation = (Math.random() - 0.48) * 0.02; // Random walk
      const newClose = currentRefPrice + fluctuation;
      currentRefPrice = newClose;
      
      const newCandle = {
          time,
          open: currentRefPrice - 0.005, // fake open
          high: Math.max(currentRefPrice, currentRefPrice - 0.005) + Math.random() * 0.01,
          low: Math.min(currentRefPrice, currentRefPrice - 0.005) - Math.random() * 0.01,
          close: newClose
      };
      
      candlestickSeriesRef.current?.update(newCandle);
      volumeSeriesRef.current?.update({
          time,
          value: Math.random() * 5000,
          color: newClose > newCandle.open ? 'rgba(24, 99, 225, 0.3)' : 'rgba(225, 24, 24, 0.3)'
      });

      setCurrentPrice(Number(newClose.toFixed(3)));
      setPriceChange(prev => Math.max(-5, Math.min(10, prev + fluctuation * 10)));
    }, 3000);

    return () => clearInterval(interval);
  }, [isOpen, currentPrice]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            ref={drawerRef}
            id="chart-container"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-full sm:w-1/2 z-[60] flex flex-col shadow-[20px_0_60px_rgba(0,0,0,0.8)] border-r border-white/5"
            style={{
              fontFamily: 'Figtree, sans-serif',
              background: isFullScreen ? '#000000' : 'rgba(0,0,0,0.80)',
              backdropFilter: isFullScreen ? 'none' : 'blur(24px)',
            }}
          >
            {/* Header */}
            <div className={`flex items-center justify-between border-b border-white/5 transition-all duration-300 ${isFullScreen ? 'p-8' : 'p-6'}`}>
              <div>
                <h2 className={`font-black text-white tracking-tight flex items-center gap-2 transition-all duration-300 ${isFullScreen ? 'text-2xl' : 'text-xl'}`}>
                  $THAAI <span className={`bg-white/10 px-1.5 py-0.5 rounded text-white/60 font-medium transition-all ${isFullScreen ? 'text-xs' : 'text-[10px]'}`}>BASE</span>
                </h2>
                <div className={`flex items-center gap-3 mt-1 font-bold transition-all duration-300 ${isFullScreen ? 'text-base' : 'text-sm'}`}>
                  <span className="text-white">${currentPrice.toFixed(3)}</span>
                  <span className={`flex items-center gap-0.5 ${priceChange >= 0 ? 'text-[#1863E1]' : 'text-[#E11818]'}`}>
                    {priceChange >= 0 ? <TrendingUp className={isFullScreen ? 'w-5 h-5' : 'w-3.5 h-3.5'} /> : <TrendingDown className={isFullScreen ? 'w-5 h-5' : 'w-3.5 h-3.5'} />}
                    {Math.abs(priceChange).toFixed(2)}% (24h)
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                 <div className={`flex flex-col items-end opacity-70 border-r border-white/10 pr-4 transition-all ${isFullScreen ? 'mr-2' : ''}`}>
                    <span className={`font-bold text-white/50 uppercase tracking-widest leading-none transition-all ${isFullScreen ? 'text-[11px]' : 'text-[9px]'}`}>Market Cap</span>
                    <span className={`font-black text-white inline-block mt-0.5 transition-all ${isFullScreen ? 'text-base' : 'text-sm'}`}>$552.6K</span>
                 </div>
                 {/* Full Screen Toggle with Framer Motion scale */}
                 <motion.button
                   onClick={toggleFullScreen}
                   whileTap={{ scale: 1.15 }}
                   title={isFullScreen ? 'Exit Full Screen (Esc)' : 'Full Screen'}
                   className="p-2.5 bg-white/5 hover:bg-[#1863E1]/20 border border-transparent hover:border-[#1863E1]/40 rounded-full transition-all group"
                   style={{ boxShadow: isFullScreen ? '0 0 16px rgba(24,99,225,0.4)' : undefined }}
                 >
                   {isFullScreen
                     ? <Minimize2 className="w-5 h-5 text-[#1863E1]" />
                     : <Maximize2 className="w-4 h-4 text-white/60 group-hover:text-[#1863E1] transition-colors" />}
                 </motion.button>
                 <button onClick={onClose} className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors group">
                   <X className={`text-white/60 group-hover:text-white ${isFullScreen ? 'w-6 h-6' : 'w-5 h-5'}`} />
                 </button>
              </div>
            </div>

            {/* Chart Area */}
            <div className="flex-1 relative w-full h-full p-2 py-4">
                <div ref={chartContainerRef} className="w-full h-full absolute inset-0 mix-blend-screen" />
                
                {/* Glowing Price Dot Overlay (simulating via css, tracking latest candle) 
                    Lightweight Charts natively handles the price line, but we emphasize the glow via standard CSS on the main container 
                */}
                <div className="absolute right-0 top-1/2 w-8 h-8 bg-[#1863E1] rounded-full blur-[20px] opacity-20 pointer-events-none mix-blend-screen animate-pulse" />
                
                {/* Custom Burn Tooltip overlay */}
                <AnimatePresence>
                  {burnDetails && burnDetails.visible && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute z-50 bg-[#161619] border border-red-500/30 p-3 rounded-lg shadow-2xl max-w-[200px]"
                      style={{ left: Math.max(10, burnDetails.x - 100), top: Math.max(10, burnDetails.y - 80) }}
                    >
                       <div className="flex items-center gap-2 mb-1">
                          <Flame className="w-4 h-4 text-red-500 fill-red-500/20" />
                          <span className="text-[10px] font-black tracking-widest text-red-500 uppercase">Tokens Burned</span>
                       </div>
                       <p className="text-xs text-white/90 font-medium leading-snug">{burnDetails.text}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
            </div>


          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
