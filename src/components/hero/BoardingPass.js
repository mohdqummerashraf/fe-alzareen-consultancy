import { Plane } from 'lucide-react';
import styles from './Boarding.module.css';

export default function BoardingPass() {
  return (
    <div className={styles.wrapper}>
      {/* Tag */}
      <span className={styles.tag}>Boarding confirmed</span>

      {/* Ticket */}
      <div className={styles.ticket}>
        <div className={styles.notchLeft}></div>
        <div className={styles.notchRight}></div>

        <div className={styles.grid}>
          {/* Main */}
          <div className={styles.main}>
            {/* Route */}
            <div className={styles.route}>
              <div>
                <h2 className={styles.city}>DEL</h2>
                <p className={styles.cityCode}>Delhi, India</p>
              </div>

              <Plane size={28} className={styles.plane} />

              <div className={styles.routeRight}>
                <h2 className={styles.city}>DXB</h2>
                <p className={styles.cityCode}>Dubai, UAE</p>
              </div>
            </div>

            {/* Row */}
            <div className={styles.detailRow}>
              <div>
                <p className={styles.label}>Passenger</p>
                <p className={styles.value}>A. Sharma</p>
              </div>

              <div className={styles.detailRight}>
                <p className={styles.label}>Role</p>
                <p className={styles.value}>HVAC Technician</p>
              </div>
            </div>

            {/* Row */}
            <div className={styles.detailRow}>
              <div>
                <p className={styles.label}>Employer</p>
                <p className={styles.value}>Al Futtaim Group</p>
              </div>

              <div className={styles.detailRight}>
                <p className={styles.label}>Contract</p>
                <p className={styles.value}>24 Months</p>
              </div>
            </div>

            {/* Dashed Divider */}
            <div className={styles.dividerDashed}></div>
          </div>

          {/* Stub */}
          <div className={styles.stub}>
            <div className={styles.qr}></div>

            <div className={styles.seatLabel}>
              SEAT
              <br />
              <span className={styles.seatValue}>12-C</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
