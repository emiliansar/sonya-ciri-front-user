export default function Test() {
    return (
        <div style={{ padding: '20px', background: '#f0f0f0' }}>
            <h1 className="test-class">
                Тест стилей - должно быть красным, жирным, 32px
            </h1>
            <div className="mt-[50px] p-[20px] bg-blue-500 text-white">
                Этот блок должен иметь отступ сверху 50px и синий фон
            </div>
        </div>
    )
}