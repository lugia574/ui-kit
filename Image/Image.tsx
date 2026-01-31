import type { CSSProperties, SyntheticEvent } from 'react';
import React, { forwardRef, useState } from 'react';
import classNames from 'classnames';
import styles from './Image.module.scss';
import { toCssUnit } from '@/shared/utils';

// Utils

interface CSSCustomProperties extends CSSProperties {
  '--img-width'?: string;
  '--img-height'?: string;
  '--img-radius'?: string;
  '--img-ratio'?: string | number;
  '--img-fit'?: string;
}

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  // Layout
  width?: string | number;
  height?: string | number;

  // Style
  radius?: string | number;
  ratio?: string | number; // 16/9, "4/3" 등
  mode?: CSSProperties['objectFit']; // cover, contain, fill...

  // Fallback
  fallback?: React.ReactNode; // 이미지 로드 실패 시 보여줄 컴포넌트
}

const Image = forwardRef<HTMLDivElement, ImageProps>(
  (
    { src, alt, width, height, radius, ratio, mode = 'cover', fallback, className, style, onLoad, onError, ...props },
    ref
  ) => {
    const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

    // 이미지 로드 성공 핸들러
    const handleLoad = (e: SyntheticEvent<HTMLImageElement>) => {
      setStatus('loaded');
      if (onLoad) onLoad(e);
    };

    // 이미지 로드 실패 핸들러
    const handleError = (e: SyntheticEvent<HTMLImageElement>) => {
      setStatus('error');
      if (onError) onError(e);
    };

    // CSS Variables 생성
    const cssVariables: CSSCustomProperties = {
      '--img-width': toCssUnit(width),
      '--img-height': toCssUnit(height),
      '--img-radius': toCssUnit(radius),
      '--img-ratio': ratio,
      '--img-fit': mode,
      ...style,
    };

    return (
      <div
        ref={ref}
        className={classNames(styles.ImageRoot, className)}
        style={cssVariables as CSSProperties}
        data-status={status}
      >
        {/* 에러가 발생했고 fallback이 있다면 fallback 렌더링 */}
        {status === 'error' && fallback ? (
          fallback
        ) : (
          <img
            src={src}
            alt={alt}
            className={styles.ImgElement}
            data-loaded={status === 'loaded'}
            onLoad={handleLoad}
            onError={handleError}
            loading="lazy" // 기본적으로 Lazy Loading 적용
            {...props}
          />
        )}
      </div>
    );
  }
);

Image.displayName = 'Image';

export default Image;
