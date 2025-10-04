import PayloadCard from '../PayloadCard'

export default function PayloadCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8 bg-background">
      <PayloadCard
        id="LEO-001"
        provider="SpaceTech Labs"
        serviceType="computing"
        price={12500}
        duration="30 days"
        availability="available"
        specs={{ cpu: "8 vCPU", storage: "256 GB SSD" }}
      />
      <PayloadCard
        id="LEO-002"
        provider="Orbital Dynamics"
        serviceType="storage"
        price={8900}
        duration="60 days"
        availability="booked"
        specs={{ storage: "1 TB NVMe" }}
      />
      <PayloadCard
        id="LEO-003"
        provider="CubeSat Solutions"
        serviceType="thermal-cycling"
        price={15000}
        duration="14 days"
        availability="available"
        specs={{ temp: "-40°C to +85°C" }}
      />
    </div>
  )
}
