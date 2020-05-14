import React from 'react';
import { url } from '../../../config';
import useFetch from '../../../hooks/useFetch';
import styles from './LeaderBoard.module.css';

export function LeaderBoard(): JSX.Element {
  const { loading, error, data } = useFetch(url + '/leaderboard');

  return (
    <div className={styles.container}>
      <h2 style={{ marginTop: 15, width: 'fit-content' }}>LeaderBoard</h2>

      {error ? (
        <p>error loading leaderboard :(</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.padding}>Name</th>
                <th className={styles.padding}>Score</th>
              </tr>
            </thead>
            {data.leaderboard.map(TableItem)}
          </table>
        </div>
      )}
    </div>
  );
}

const TableItem = ({ id, name, score }: { id: number; name: string; score: string }): JSX.Element => (
  <tbody key={id}>
    <tr>
      <td className={styles.padding}>{name}</td>
      <td className={styles.padding}>{score}</td>
    </tr>
  </tbody>
);
